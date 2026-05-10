from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    # App
    APP_NAME: str = "Multi-Agent Research System"
    APP_ENV: str = "development"
    DEBUG: bool = True
    SECRET_KEY: str = "your-super-secret-key-change-in-production-please"
    
    # JWT
    JWT_SECRET_KEY: str = "jwt-super-secret-key-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30

    # Database
    DATABASE_URL: str = "postgresql+asyncpg://postgres:password@localhost:5432/research_db"
    DATABASE_POOL_SIZE: int = 10
    DATABASE_MAX_OVERFLOW: int = 20

    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    CELERY_BROKER_URL: str = "redis://localhost:6379/1"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6379/2"

    # ── LLM Provider Selection ────────────────────────────────────────────────
    # Options: "gemini" | "groq" | "mistral" | "together" | "ollama" | "cohere" | "openrouter"
    LLM_PROVIDER: str = "gemini"

    # Google Gemini (FREE — https://aistudio.google.com/apikey)
    GOOGLE_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-2.0-flash"

    # Groq (FREE — https://console.groq.com)
    GROQ_API_KEY: str = ""
    GROQ_MODEL: str = "llama-3.3-70b-versatile"   # also: gemma2-9b-it, mixtral-8x7b-32768

    # Mistral (FREE tier — https://console.mistral.ai)
    MISTRAL_API_KEY: str = ""
    MISTRAL_MODEL: str = "mistral-small-latest"    # also: open-mistral-nemo

    # Together AI (FREE $25 credits — https://api.together.ai)
    TOGETHER_API_KEY: str = ""
    TOGETHER_MODEL: str = "meta-llama/Llama-3.3-70B-Instruct-Turbo"  # also: Qwen/Qwen2.5-72B

    # Ollama (100% FREE local — https://ollama.com)
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "llama3.2"                 # also: mistral, qwen2.5, deepseek-r1, gemma3

    # OpenRouter (FREE models available — https://openrouter.ai)
    OPENROUTER_API_KEY: str = ""
    OPENROUTER_MODEL: str = "deepseek/deepseek-chat-v3-0324:free"  # truly free

    # Cohere (FREE 1000 calls/month — https://dashboard.cohere.com)
    COHERE_API_KEY: str = ""
    COHERE_MODEL: str = "command-r"

    # Embeddings — free local model (no API key needed)
    EMBEDDING_MODEL: str = "all-MiniLM-L6-v2"     # runs locally via sentence-transformers

    # Search
    SERPER_API_KEY: str = ""
    FIRECRAWL_API_KEY: str = ""

    # Vector DB
    CHROMA_PERSIST_DIR: str = "./chroma_db"
    CHROMA_COLLECTION_NAME: str = "research_docs"

    # AWS S3
    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""
    AWS_REGION: str = "us-east-1"
    S3_BUCKET_NAME: str = "research-documents"

    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:8000",
        "https://your-domain.com",
    ]

    # File Upload
    MAX_UPLOAD_SIZE: int = 50 * 1024 * 1024  # 50MB
    ALLOWED_EXTENSIONS: List[str] = [".pdf", ".docx", ".txt", ".csv", ".md"]

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
