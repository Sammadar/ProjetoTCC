from pydantic import BaseModel
from typing import Optional, List
from datetime import date, time

class AgendamentoBase(BaseModel):
    paciente_id: int
    data: date
    hora: time
    tipo: Optional[str]
    medico: Optional[str]
    status: Optional[str] = "Pendente"
    observacoes: Optional[str]

class AgendamentoCreate(AgendamentoBase):
    pass

class Agendamento(AgendamentoBase):
    id: int

    class Config:
        orm_mode = True