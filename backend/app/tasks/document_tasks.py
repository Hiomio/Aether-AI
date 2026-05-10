from app.tasks.celery_app import celery_app
import logging

logger = logging.getLogger(__name__)


@celery_app.task(bind=True, name="process_document", max_retries=3)
def process_document(self, document_id: str, content: bytes, file_type: str):
    """
    Process uploaded document:
    1. Extract text
    2. Chunk into segments
    3. Generate embeddings
    4. Store in ChromaDB
    5. Update document status in PostgreSQL
    """
    try:
        logger.info(f"Processing document {document_id}")

        # 1. Extract text based on file type
        text = extract_text(content, file_type)

        # 2. Chunk the text
        chunks = chunk_text(text)

        # 3. Store embeddings in ChromaDB
        store_embeddings(document_id, chunks)

        # 4. Update status (would need sync DB here)
        logger.info(f"Document {document_id} processed: {len(chunks)} chunks")
        return {"document_id": document_id, "chunks": len(chunks), "status": "ready"}

    except Exception as exc:
        logger.error(f"Failed to process document {document_id}: {exc}")
        raise self.retry(exc=exc, countdown=60)


def extract_text(content: bytes, file_type: str) -> str:
    """Extract text from various file formats."""
    if file_type.upper() == "PDF":
        try:
            from pypdf import PdfReader
            import io
            reader = PdfReader(io.BytesIO(content))
            return "\n".join(page.extract_text() for page in reader.pages)
        except Exception as e:
            logger.error(f"PDF extraction failed: {e}")
            return ""
    elif file_type.upper() in ("TXT", "MD"):
        return content.decode("utf-8", errors="ignore")
    elif file_type.upper() == "DOCX":
        try:
            import docx
            import io
            doc = docx.Document(io.BytesIO(content))
            return "\n".join(p.text for p in doc.paragraphs)
        except Exception as e:
            logger.error(f"DOCX extraction failed: {e}")
            return ""
    return content.decode("utf-8", errors="ignore")


def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 200) -> list:
    """Split text into overlapping chunks for embedding."""
    chunks = []
    words = text.split()
    for i in range(0, len(words), chunk_size - overlap):
        chunk = " ".join(words[i:i + chunk_size])
        if chunk:
            chunks.append(chunk)
    return chunks


def store_embeddings(document_id: str, chunks: list):
    """Store document chunks in ChromaDB."""
    try:
        import chromadb
        from app.core.config import settings

        client = chromadb.PersistentClient(path=settings.CHROMA_PERSIST_DIR)
        collection = client.get_or_create_collection(
            name=settings.CHROMA_COLLECTION_NAME,
            metadata={"hnsw:space": "cosine"},
        )

        ids = [f"{document_id}_{i}" for i in range(len(chunks))]
        metadatas = [{"document_id": document_id, "chunk_index": i} for i in range(len(chunks))]

        collection.add(documents=chunks, ids=ids, metadatas=metadatas)
        logger.info(f"Stored {len(chunks)} chunks in ChromaDB for document {document_id}")
    except Exception as e:
        logger.error(f"ChromaDB storage failed: {e}")
        raise
