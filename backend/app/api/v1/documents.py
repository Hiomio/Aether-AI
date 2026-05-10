from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from typing import List
import os

from app.core.database import get_db
from app.core.security import get_current_user_id
from app.core.config import settings
from app.models.models import Document
from app.schemas.schemas import DocumentOut

router = APIRouter()

ALLOWED = {".pdf", ".docx", ".txt", ".csv", ".md"}


@router.get("/", response_model=List[DocumentOut])
async def list_documents(
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Document)
        .where(Document.user_id == user_id)
        .order_by(desc(Document.created_at))
    )
    return [DocumentOut.model_validate(d) for d in result.scalars().all()]


@router.post("/upload", response_model=DocumentOut)
async def upload_document(
    file: UploadFile = File(...),
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    ext = os.path.splitext(file.filename or "")[1].lower()
    if ext not in ALLOWED:
        raise HTTPException(status_code=400, detail=f"File type {ext} not allowed")

    content = await file.read()
    if len(content) > settings.MAX_UPLOAD_SIZE:
        raise HTTPException(status_code=413, detail="File too large (max 50MB)")

    doc = Document(
        user_id=user_id,
        name=file.filename or "unnamed",
        original_name=file.filename or "unnamed",
        file_type=ext.lstrip(".").upper(),
        file_size=len(content),
        status="processing",
    )
    db.add(doc)
    await db.flush()
    await db.refresh(doc)

    # In production: push to Celery task for processing + embedding
    # process_document.delay(doc.id, content)

    return DocumentOut.model_validate(doc)


@router.delete("/{doc_id}")
async def delete_document(
    doc_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Document).where(Document.id == doc_id, Document.user_id == user_id)
    )
    doc = result.scalar_one_or_none()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    await db.delete(doc)
    return {"message": "Deleted"}
