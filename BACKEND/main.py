from fastapi import FastAPI, status, Depends, Response
from fastapi.params import Body
import classes
import model
from database import engine,get_db
from sqlalchemy.orm import Session
from webscraping import editais_ufu,desafio
from typing import Optional
from sqlalchemy.exc import IntegrityError
import schedule
import time
import os
import threading
from datetime import datetime
import asyncio

model.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
async def root(): 
    return {"Hello":"World!!"}

@app.post("/criar", status_code=status.HTTP_201_CREATED)
async def criar_valores(nova_mensagem: classes.Mensagem, db:Session = Depends(get_db)):
    mensagem_criada = model.Model_Mensagem(
        titulo=nova_mensagem.titulo, 
        conteudo=nova_mensagem.conteudo,
        publicada = nova_mensagem.publicada)
    db.add(mensagem_criada)
    db.commit()
    db.refresh(mensagem_criada)

    return {"Inserido na tabela": {
        "id": mensagem_criada.id,
        "titulo": mensagem_criada.titulo,
        "conteudo": mensagem_criada.conteudo,
        "publicada": mensagem_criada.publicada,
        "created_at": mensagem_criada.created_at
    }}

@app.put("/desafio", status_code=status.HTTP_201_CREATED)
async def desafio_pdsi2(db: Session = Depends(get_db)):
    menus_salvos = []
    menus = desafio()

    for navMenu in menus:
        navMenu_existente = db.query(model.Model_Desafio).filter(
            model.Model_Desafio.menuNav == navMenu["menuNav"]
        ).first()
        
        if not navMenu_existente:
            novo_menu = model.Model_Desafio(
                menuNav=navMenu["menuNav"],
                link=navMenu["link"]
            )
            try:
                db.add(novo_menu)
                db.commit()
                db.refresh(novo_menu)
                menus_salvos.append(novo_menu)
            except IntegrityError:
                db.rollback()
    if not menus_salvos:
        return Response(status_code=status.HTTP_304_NOT_MODIFIED)
    return Response(status_code=status.HTTP_201_CREATED)


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

def agendamento_atualizacao_bd():
    while not stop_event.is_set():
        schedule.run_pending()
        time.sleep(60)

def executa_atualizacao():
    asyncio.run(atualiza_bd())

def iniciar_thread_atualizacao():
    horario_agendado = "05:00"
    schedule.every().monday.at(horario_agendado).do(lambda: threading.Thread(target=executa_atualizacao).start())
    thread = threading.Thread(target=agendamento_atualizacao_bd, daemon=True)
    thread.start()

iniciar_thread_atualizacao()