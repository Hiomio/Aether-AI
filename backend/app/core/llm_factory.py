"""
LLM Factory — returns the configured free LLM provider.
Set LLM_PROVIDER in your .env to switch between providers.

Free providers ranked by quality (May 2026):
  1. gemini     — Gemini 2.0 Flash       (Google AI Studio, free)
  2. groq        — Llama 3.3 70B          (Groq Cloud, free tier)
  3. mistral     — Mistral Small 3.1      (Mistral, free tier)
  4. together    — Llama 3.3 / Qwen2.5    (Together AI, $25 free credits)
  5. ollama      — Any model locally      (100% free, needs Ollama installed)
  6. openrouter  — DeepSeek V3 free       (OpenRouter free models)
  7. cohere      — Command-R              (Cohere, 1000 calls/month free)
"""

from functools import lru_cache
from langchain_core.language_models import BaseChatModel
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)


@lru_cache(maxsize=1)
def get_llm(temperature: float = 0.7) -> BaseChatModel:
    """Returns the configured LLM instance (cached)."""
    provider = settings.LLM_PROVIDER.lower()
    logger.info(f"Loading LLM provider: {provider}")

    if provider == "gemini":
        return _gemini(temperature)
    elif provider == "groq":
        return _groq(temperature)
    elif provider == "mistral":
        return _mistral(temperature)
    elif provider == "together":
        return _together(temperature)
    elif provider == "ollama":
        return _ollama(temperature)
    elif provider == "openrouter":
        return _openrouter(temperature)
    elif provider == "cohere":
        return _cohere(temperature)
    else:
        logger.warning(f"Unknown provider '{provider}', falling back to Gemini")
        return _gemini(temperature)


def _gemini(temperature: float) -> BaseChatModel:
    """
    Google Gemini 2.0 Flash
    Free: 15 RPM, 1M TPM, 1500 RPD
    Get key: https://aistudio.google.com/apikey
    """
    from langchain_google_genai import ChatGoogleGenerativeAI
    return ChatGoogleGenerativeAI(
        model=settings.GEMINI_MODEL,
        google_api_key=settings.GOOGLE_API_KEY,
        temperature=temperature,
        streaming=True,
    )


def _groq(temperature: float) -> BaseChatModel:
    """
    Groq Cloud — ultra-fast inference
    Free: 30 RPM, 6000 RPD for llama-3.3-70b-versatile
    Get key: https://console.groq.com/keys
    Models: llama-3.3-70b-versatile, gemma2-9b-it, mixtral-8x7b-32768
    """
    from langchain_groq import ChatGroq
    return ChatGroq(
        model=settings.GROQ_MODEL,
        groq_api_key=settings.GROQ_API_KEY,
        temperature=temperature,
        streaming=True,
    )


def _mistral(temperature: float) -> BaseChatModel:
    """
    Mistral AI
    Free: limited tier available
    Get key: https://console.mistral.ai/api-keys
    Models: mistral-small-latest, open-mistral-nemo
    """
    from langchain_mistralai import ChatMistralAI
    return ChatMistralAI(
        model=settings.MISTRAL_MODEL,
        mistral_api_key=settings.MISTRAL_API_KEY,
        temperature=temperature,
        streaming=True,
    )


def _together(temperature: float) -> BaseChatModel:
    """
    Together AI
    Free: $25 credits on signup
    Get key: https://api.together.ai
    Models: meta-llama/Llama-3.3-70B-Instruct-Turbo
             Qwen/Qwen2.5-72B-Instruct-Turbo
             deepseek-ai/DeepSeek-V3
    """
    from langchain_together import ChatTogether
    return ChatTogether(
        model=settings.TOGETHER_MODEL,
        together_api_key=settings.TOGETHER_API_KEY,
        temperature=temperature,
        streaming=True,
    )


def _ollama(temperature: float) -> BaseChatModel:
    """
    Ollama — 100% local, completely free forever
    Install: https://ollama.com
    Pull a model first: ollama pull llama3.2
    Models: llama3.2, mistral, qwen2.5, deepseek-r1, gemma3, phi4
    """
    from langchain_ollama import ChatOllama
    return ChatOllama(
        model=settings.OLLAMA_MODEL,
        base_url=settings.OLLAMA_BASE_URL,
        temperature=temperature,
        streaming=True,
    )


def _openrouter(temperature: float) -> BaseChatModel:
    """
    OpenRouter — access many models, some completely free
    Free models: deepseek/deepseek-chat-v3-0324:free
                 google/gemma-3-27b-it:free
                 meta-llama/llama-4-scout:free
    Get key: https://openrouter.ai/keys
    """
    from langchain_openai import ChatOpenAI
    return ChatOpenAI(
        model=settings.OPENROUTER_MODEL,
        openai_api_key=settings.OPENROUTER_API_KEY,
        openai_api_base="https://openrouter.ai/api/v1",
        temperature=temperature,
        streaming=True,
        default_headers={
            "HTTP-Referer": "https://your-app.com",
            "X-Title": "Multi-Agent Research System",
        },
    )


def _cohere(temperature: float) -> BaseChatModel:
    """
    Cohere Command-R
    Free: 1000 API calls/month
    Get key: https://dashboard.cohere.com/api-keys
    """
    from langchain_cohere import ChatCohere
    return ChatCohere(
        model=settings.COHERE_MODEL,
        cohere_api_key=settings.COHERE_API_KEY,
        temperature=temperature,
        streaming=True,
    )


def get_embeddings():
    """
    Free local embeddings via sentence-transformers.
    Runs on CPU, no API key needed.
    """
    from langchain_community.embeddings import HuggingFaceEmbeddings
    return HuggingFaceEmbeddings(
        model_name=settings.EMBEDDING_MODEL,  # all-MiniLM-L6-v2
        model_kwargs={"device": "cpu"},
        encode_kwargs={"normalize_embeddings": True},
    )
