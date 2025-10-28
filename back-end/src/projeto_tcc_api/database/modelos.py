from datetime import date

from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship

from src.projeto_tcc_api.database.banco_dados import Base


# from datetime import datetime
# from sqlalchemy import Column, Integer, String, DateTime
# from src.projeto_tcc_api.database.banco_dados import Base

class PacienteEntidade(Base):
    __tablename__ = "pacientes"

    id: int = Column(Integer, primary_key=True, index=True)
    nome: str = Column(String(100), nullable=False)
    tipo_sanguineo: str = Column(String(2), nullable=False)
    contato_emergencia_numero: str = Column(String(15), nullable=False)
    contato_emergencia: str = Column(String(100), nullable=False)

