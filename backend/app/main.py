from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from contextlib import asynccontextmanager
import logging

from app.core.config import settings
from app.core.database import init_db
from app.api.v1 import auth, chat, research, reports, documents, agents, workspaces, team

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting Multi-Agent Research System...")
    await init_db()
    yield
    logger.info("Shutting down...")


app = FastAPI(
    title="Multi-Agent Research System API",
    description="Enterprise AI research platform with multi-agent orchestration",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        
        "http://127.0.0.1:8000",
    ],

    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(chat.router, prefix="/api/chats", tags=["Chats"])
app.include_router(research.router, prefix="/api/research", tags=["Research"])
app.include_router(reports.router, prefix="/api/reports", tags=["Reports"])
app.include_router(documents.router, prefix="/api/documents", tags=["Documents"])
app.include_router(agents.router, prefix="/api/agents", tags=["Agents"])
app.include_router(workspaces.router, prefix="/api/workspaces", tags=["Workspaces"])
app.include_router(team.router, prefix="/api/team", tags=["Team"])


@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "multi-agent-research"}


@app.get("/")
async def root():
    return {"message": "Multi-Agent Research System API", "version": "1.0.0"}
