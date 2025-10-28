from datetime import datetime

from pydantic import BaseModel, Field


# Entidade
class Paciente(BaseModel):
    id: int = Field()
    nome: str = Field()
    tipo_sanguineo: str = Field()
    contato_emergencia_numero: str = Field()
    contato_emergencia: str = Field()

    class Config:
        populate_by_name = True


class PacienteCadastro(BaseModel):
    nome: str = Field()
    tipo_sanguineo: str = Field(alias="tipoSanguineo")
    contato_emergencia_numero: str = Field(alias="contatoEmergenciaNumero")
    contato_emergencia: str = Field(alias="contatoEmergencia")


# class AlunoEditar(BaseModel):
#     nome: str = Field()
#     sobrenome: str = Field()
#     cpf: str = Field()
#     data_nascimento: datetime = Field(alias="dataNascimento")