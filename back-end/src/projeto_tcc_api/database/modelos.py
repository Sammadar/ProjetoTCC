from datetime import date
from sqlite3 import Time
from typing import Text

from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship

from src.projeto_tcc_api.database.banco_dados import Base


# from datetime import datetime
# from sqlalchemy import Column, Integer, String, DateTime
# from src.projeto_tcc_api.database.banco_dados import Base

class Paciente(Base):
    __tablename__ = "pacientes"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)
    cpf = Column(String(14), unique=True, nullable=False)
    telefone = Column(String(20))
    sexo = Column(String(10))
    data_nascimento = Column(Date)
    cep = Column(String(9))
    endereco = Column(String(150))
    cidade = Column(String(100))
    estado = Column(String(2))
    nome_contato_emergencia = Column(String(100))
    telefone_contato_emergencia = Column(String(20))
    alergias = Column(JSON) 
    tipo_sanguineo = Column(String(5))

    agendamentos = relationship("Agendamento", back_populates="paciente")


class Agendamento(Base):
    __tablename__ = "agendamentos"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("pacientes.id"))
    date = Column(Date)
    time = Column(Time)
    type = Column(String(50))
    doctor = Column(String(100))
    status = Column(String(20))
    notes = Column(Text)

    paciente = relationship("Paciente", back_populates="agendamentos")