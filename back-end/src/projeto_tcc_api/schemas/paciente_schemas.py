from pydantic import BaseModel
from typing import Optional, List
from datetime import date, time

class PacienteBase(BaseModel):
    nome: str
    cpf: str
    telefone: Optional[str]
    sexo: Optional[str]
    data_nascimento: Optional[date]
    cep: Optional[str]
    endereco: Optional[str]
    cidade: Optional[str]
    estado: Optional[str]
    nome_contato_emergencia: Optional[str]
    telefone_contato_emergencia: Optional[str]
    alergias: Optional[List[str]] = []
    tipo_sanguineo: Optional[str]

class PacienteCreate(PacienteBase):
    pass

class Paciente(PacienteBase):
    id: int

    class Config:
        orm_mode = True