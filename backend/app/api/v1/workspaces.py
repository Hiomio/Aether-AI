from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List

from app.core.database import get_db
from app.core.security import get_current_user_id
from app.models.models import Workspace, WorkspaceMember
from app.schemas.schemas import WorkspaceCreate, WorkspaceOut

router = APIRouter()


@router.get("/", response_model=List[WorkspaceOut])
async def list_workspaces(
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Workspace).where(Workspace.owner_id == user_id)
    )
    return [WorkspaceOut.model_validate(w) for w in result.scalars().all()]


@router.post("/", response_model=WorkspaceOut)
async def create_workspace(
    data: WorkspaceCreate,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    ws = Workspace(name=data.name, description=data.description, owner_id=user_id)
    db.add(ws)
    await db.flush()
    # Add owner as admin member
    member = WorkspaceMember(workspace_id=ws.id, user_id=user_id, role="admin")
    db.add(member)
    await db.flush()
    await db.refresh(ws)
    return WorkspaceOut.model_validate(ws)


@router.delete("/{ws_id}")
async def delete_workspace(
    ws_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Workspace).where(Workspace.id == ws_id, Workspace.owner_id == user_id)
    )
    ws = result.scalar_one_or_none()
    if not ws:
        raise HTTPException(status_code=404, detail="Workspace not found")
    await db.delete(ws)
    return {"message": "Deleted"}
