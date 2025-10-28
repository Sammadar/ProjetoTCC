from fastapi import HTTPException
from fastapi.params import Depends, Query
from sqlalchemy import or_
from sqlalchemy.orm import Session

from src.projeto_tcc_api.app import router
from src.projeto_tcc_api.dependencias import get_db
from src.projeto_tcc_api.database.modelos import PacienteEntidade
from src.projeto_tcc_api.schemas.paciente_schemas import Paciente, PacienteCadastro


@router.get("/api/pacientes", tags=["pacientes"])
def listar_todos_pacientes(db: Session = Depends(get_db)):
    pacientes = db.query(PacienteEntidade).all()
    pacientes = [Paciente(
        id=paciente.id,
        nome=paciente.nome,
        sobrenome=paciente.sobrenome,
        cpf=paciente.cpf,
        data_nascimento=paciente.data_nascimento,
    ) for paciente in pacientes]
    return pacientes


# @router.get("/api/pacientes/{id}", tags=["pacientes"])
# def obter_por_id_pacientes(id: int, db: Session = Depends(get_db)):
#     paciente = db.query(PacienteEntidade).filter(AlunoEntidade.id == id).first()
#     if paciente:
#         return Paciente(
#             id=paciente.id,
#             nome=paciente.nome,
#             sobrenome=paciente.sobrenome,
#             cpf=paciente.cpf,
#             data_nascimento=paciente.data_nascimento,
#         )
#     # Lançando uma exceção com o status code de 404(não encontrado)
#     raise HTTPException(status_code=404, detail=f"Paciente não encontrado com id: {id}")


@router.post("/api/pacientes", tags=["pacientes"])
def cadastrar_aluno(form: PacienteCadastro, db: Session = Depends(get_db)):
    # instanciar um objeto da classe PacienteEntidade
    paciente = PacienteEntidade(
        nome=form.nome,
        tipo_sanguineo=form.tipo_sanguineo,
        contato_emergencia_numero=form.contato_emergencia_numero,
        contato_emergencia=form.contato_emergencia)

    db.add(paciente)
    db.commit()
    db.refresh(paciente)

    return paciente


# @router.delete("/api/pacientes/{id}", status_code=204, tags=["pacientes"])
# def apagar_aluno(id: int, db: Session = Depends(get_db)):
#     paciente = db.query(AlunoEntidade).filter(AlunoEntidade.id == id).first()
#     if paciente:
#         db.delete(paciente)
#         db.commit()
#         return
#     raise HTTPException(status_code=404, detail=f"Paciente não encontrado com id: {id}")


# @router.put("/api/pacientes/{id}", tags=["pacientes"])
# def editar_aluno(id: int, form: AlunoEditar, db: Session = Depends(get_db)):
#     paciente = db.query(AlunoEntidade).filter(AlunoEntidade.id == id).first()
#     if paciente:
#         paciente.nome = form.nome
#         paciente.sobrenome = form.sobrenome
#         paciente.cpf = form.cpf
#         paciente.data_nascimento = form.data_nascimento
#         db.commit()
#         db.refresh(paciente)
#         return paciente
#     raise HTTPException(status_code=404, detail=f"Paciente não encontrado com id: {id}")