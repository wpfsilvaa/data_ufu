import pytest
from fastapi.testclient import TestClient
from main import app
from database import get_db
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker,declarative_base
from webscraping import desafio as get_desafio
import model
from dotenv import load_dotenv
import os
import json

#Configuração inicial do teste

load_dotenv()
user = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")
database = os.getenv("DB_NAME")
host = os.getenv("DB_HOST")

SQLALCHEMY_DATABASE_URL = f"postgresql://{user}:{password}@{host}/{database}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

client = TestClient(app)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@pytest.fixture(scope="function", autouse=True)
def setup_db():
    model.Base.metadata.create_all(bind=engine)
    yield
    model.Base.metadata.drop_all(bind=engine)


def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"Hello": "World!!"}

def test_square():
    response = client.get("/quadrado/4")
    assert response.status_code == 200
    assert response.json() == 16

def test_criar_valores():
    data = {
        "titulo": "Teste",
        "conteudo": "Conteúdo de teste",
        "publicada": True
    }
    response = client.post("/criar", json=data)
    assert response.status_code == 201
    assert "Inserido na tabela" in response.json()

def test_popula_banco_editais():
    response = client.put("/webscraping")
    assert response.status_code in [201, 304]  # 201 se novos editais foram inseridos, 304 se já estavam atualizados

def test_retorna_webscraping():
    client.put('/webscraping')
    response = client.get("/webscraping")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_retorna_webscraping_filtros():
    client.put('/webscraping')
    response = client.get("/webscraping?org=FMVZ,ICB&tipo=Programa Pet,Edital")
    assert response.status_code == 200
    assert isinstance(response.json(), dict)

def test_popula_links():
    response = client.put("/desafio")
    assert response.status_code in [201, 304]  # 201 se novos links foram inseridos, 304 se já estavam atualizados

def test_retorna_desafio():
    response = client.put("/desafio")
    response = client.get("/desafio")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def finalizar_thread():
    parar_thread_atualizacao()