from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from .models import StatusEnum

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    email: str
    created_at: datetime
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class JobCreate(BaseModel):
    company: str
    role: str
    status: StatusEnum = StatusEnum.applied
    notes: Optional[str] = None

class JobUpdate(BaseModel):
    company: Optional[str] = None
    role: Optional[str] = None
    status: Optional[StatusEnum] = None
    notes: Optional[str] = None

class JobOut(JobCreate):
    id: int
    applied_date: datetime
    owner_id: int
    class Config:
        from_attributes = True
