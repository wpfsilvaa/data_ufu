from pydantic import BaseModel

class Mensagem(BaseModel):
    titulo:str
    conteudo:str
    publicada:bool = True

class Edital(BaseModel):
    numero_edital:str
    orgao_responsavel:str
    titulo:str
    tipo:str
    data_publicacao:str
    link:str

class desafio(BaseModel):
    menuNav:str
    link:str
    created_at:str