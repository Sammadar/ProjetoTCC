import uvicorn

from src.projeto_tcc_api.database.banco_dados import Base, engine, popular_banco_dados
from src.projeto_tcc_api.api.v1 import paciente_controller
from src.projeto_tcc_api.app import app

# Base.metadata.drop_all(bind=engine)
# Base.metadata.create_all(bind=engine)
# popular_banco_dados()

app.include_router(paciente_controller.router)

if __name__ == "__main__":
    uvicorn.run("main:app")