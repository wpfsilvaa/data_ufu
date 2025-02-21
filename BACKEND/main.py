import time
import threading
from datetime import datetime
import asyncio

from fastapi import FastAPI, status, Depends, Response
from fastapi.params import Body
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from contextlib import asynccontextmanager
import schedule

import classes
import model
from database import engine, get_db
from webscraping import editais_ufu, desafio
from typing import Optional

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Inicializando o banco de dados...")
    model.Base.metadata.create_all(bind=engine) 
    yield 
    print("Encerrando a aplicação...")

app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost:3000",  # Frontend local
    "http://127.0.0.1:3000"  # Outra possível variação local
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permite apenas essas origens
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos os headers
)


@app.get("/")
async def root(): 
    return {"Hello":"World!!"}

@app.post("/criar", status_code=status.HTTP_201_CREATED)
async def criar_valores(nova_mensagem: classes.Mensagem, db: Session = Depends(get_db)):
    try:
        mensagem_criada = model.Model_Mensagem(
            titulo=nova_mensagem.titulo,
            conteudo=nova_mensagem.conteudo,
            publicada=nova_mensagem.publicada
        )
        db.add(mensagem_criada)
        db.commit()
        db.refresh(mensagem_criada)

        return {
            "mensagem": "Mensagem criada com sucesso",
            "dados": {
                "titulo": mensagem_criada.titulo,
                "conteudo": mensagem_criada.conteudo,
                "publicada": mensagem_criada.publicada,
            }
        }
    except Exception as e:
        db.rollback()
        return Response(content=f"Erro ao inserir: {str(e)}", status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

@app.get("/criar")
def retorna_mensagens(db: Session = Depends(get_db)):
    query = db.query(model.Model_Mensagem)
    mensagens = query.all()
    if not mensagens:
        return {"Mensagem": "Nenhuma mensagem indexada."}
    return mensagens



@app.put("/desafio", status_code=status.HTTP_201_CREATED)
async def desafio_pdsi2(db: Session = Depends(get_db)):
    menus = desafio()
    novos_menus = []

    for navMenu in menus:
        if not db.query(model.Model_Desafio).filter(
            model.Model_Desafio.menuNav == navMenu["menuNav"]
        ).first():
            novo_menu = model.Model_Desafio(
                menuNav=navMenu["menuNav"],
                link=navMenu["link"]
            )
            try:
                db.add(novo_menu)
                db.commit()
                db.refresh(novo_menu)
                novos_menus.append(novo_menu)
            except IntegrityError:
                db.rollback()

    return {"mensagem": "Menus atualizados com sucesso", "dados": novos_menus} if novos_menus else Response(status_code=status.HTTP_304_NOT_MODIFIED)

@app.get("/desafio")
async def retorna_desafio(db: Session = Depends(get_db)):
    query = db.query(model.Model_Desafio)
    menus = query.all()
    if not menus:
        return {"Mensagem": "Nenhum menu indexado."}
    return menus


@app.put("/webscraping", status_code=status.HTTP_201_CREATED)
async def popula_banco_editais(db: Session = Depends(get_db)):
    editais_salvos = []
    editais = editais_ufu()

    for edital in editais:
        edital_existente = db.query(model.Model_Editais).filter(
            model.Model_Editais.titulo_edital == edital["titulo"],
            model.Model_Editais.data_publicacao == edital["data_publicacao"]
        ).first()

        if not edital_existente:
            novo_edital = model.Model_Editais(
                numero_edital=edital["numero_edital"],
                orgao_responsavel=edital["orgao_responsavel"],
                titulo_edital=edital["titulo"],
                link_edital=edital["link"],
                tipo=edital["tipo"],
                data_publicacao=edital["data_publicacao"]
            )
            try:
                db.add(novo_edital)
                db.commit()
                db.refresh(novo_edital)
                editais_salvos.append(novo_edital)
            except IntegrityError:
                db.rollback()

    if not editais_salvos:
        return Response(status_code=status.HTTP_304_NOT_MODIFIED)
    return {"Mensagem": editais_salvos}

@app.get("/webscraping")
async def retorna_webscraping(
    db: Session = Depends(get_db),
    org: Optional[str] = None,
    tipo: Optional[str] = None
):
    query = db.query(model.Model_Editais)

    if org:
        org_lista = org.split(",")
        query = query.filter(model.Model_Editais.orgao_responsavel.in_(org_lista))

    if tipo:
        tipo_lista = tipo.split(",")
        query = query.filter(model.Model_Editais.tipo.in_(tipo_lista))

    editais = query.all()

    if not editais:
        return {"Mensagem": "Nenhum edital encontrado com os filtros fornecidos"}

    return editais

@app.get("/quadrado/{num}")
def square(num:int):
    return num ** 2

async def atualiza_bd():
    db = next(get_db())
    print(f"Executando atualização do banco de dados em: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    await popula_banco_editais(db)
    await desafio_pdsi2(db)
    print("Banco de dados atualizado.")

def executa_atualizacao():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(atualiza_bd())

def iniciar_thread_atualizacao():
    threading.Thread(target=executa_atualizacao).start()
    horario_agendado = "05:00"
    schedule.every().monday.at(horario_agendado).do(lambda: threading.Thread(target=executa_atualizacao).start())

    def rodar_agendamentos():
        while True:
            schedule.run_pending()
            time.sleep(60)

    thread = threading.Thread(target=rodar_agendamentos, daemon=True)
    thread.start()

iniciar_thread_atualizacao()