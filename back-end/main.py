from fastapi import FastAPI
from .database import Base, engine
from .v1 import paciente_controller, agendamento_controller

Base.metadata.create_all(bind=engine)

app = FastAPI(title="CuraSystem API")

app.include_router(paciente_controller.router)
app.include_router(agendamento_controller.router)
