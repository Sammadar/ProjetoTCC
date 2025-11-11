from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/agendamentos", tags=["Agendamentos"])

@router.post("/", response_model=schemas.Agendamento)
def criar_agendamento(agendamento: schemas.AgendamentoCreate, db: Session = Depends(get_db)):
    paciente = db.query(models.Paciente).filter(models.Paciente.id == agendamento.paciente_id).first()
    if not paciente:
        raise HTTPException(status_code=404, detail="Paciente não encontrado")
    novo = models.Agendamento(**agendamento.dict())
    db.add(novo)
    db.commit()
    db.refresh(novo)
    return novo

@router.get("/", response_model=list[schemas.Agendamento])
def listar_agendamentos(db: Session = Depends(get_db)):
    return db.query(models.Agendamento).all()

@router.get("/{id}", response_model=schemas.Agendamento)
def obter_agendamento(id: int, db: Session = Depends(get_db)):
    ag = db.query(models.Agendamento).filter(models.Agendamento.id == id).first()
    if not ag:
        raise HTTPException(status_code=404, detail="Agendamento não encontrado")
    return ag

@router.delete("/{id}")
def deletar_agendamento(id: int, db: Session = Depends(get_db)):
    ag = db.query(models.Agendamento).filter(models.Agendamento.id == id).first()
    if not ag:
        raise HTTPException(status_code=404, detail="Agendamento não encontrado")
    db.delete(ag)
    db.commit()
    return {"message": "Agendamento excluído com sucesso"}
