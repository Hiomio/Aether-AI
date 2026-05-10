from fastapi import APIRouter, Depends
from app.core.security import get_current_user_id

router = APIRouter()


@router.get("/members")
async def list_members(user_id: str = Depends(get_current_user_id)):
    return {
        "members": [
            {"id": "1", "name": "Alex Johnson", "email": "alex@example.com", "role": "admin", "joined_at": "2024-01-15"},
            {"id": "2", "name": "Sarah Chen", "email": "sarah@example.com", "role": "member", "joined_at": "2024-02-20"},
            {"id": "3", "name": "Mike Torres", "email": "mike@example.com", "role": "viewer", "joined_at": "2024-03-10"},
        ]
    }


@router.post("/invite")
async def invite_member(data: dict, user_id: str = Depends(get_current_user_id)):
    # In production: send email invitation
    return {"message": f"Invitation sent to {data.get('email')}"}
