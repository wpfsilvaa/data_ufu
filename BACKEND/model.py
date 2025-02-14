from sqlalchemy import Column, Integer, String, Boolean, TIMESTAMP
from sqlalchemy.sql import text
from database import Base

class Model_Mensagem(Base):
    __tablename__ = 'teste'
    
    id = Column(Integer, primary_key=True, nullable=False)
    titulo = Column(String, nullable=False)
    conteudo = Column(String, nullable=False)
    publicada = Column(Boolean, server_default='True', nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'), nullable=False)

class Model_Editais(Base):
    __tablename__ = 'editais'

    id = Column(Integer,primary_key=True,nullable=False)
    numero_edital = Column(String,nullable=False)
    orgao_responsavel = Column(String,nullable=False)
    titulo_edital = Column(String,nullable=False)
    link_edital = Column(String,nullable=False)
    tipo = Column(String,nullable=False)
    data_publicacao = Column(String,nullable=False)

class Model_Desafio(Base):
    __tablename__ = 'desafio'

    id = Column(Integer,primary_key=True,nullable=False)
    menuNav = Column(String,nullable=False)
    link = Column(String,nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'), nullable=False)
    