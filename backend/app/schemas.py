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
    title: str
    company: str
    location: str
    status: Optional[StatusEnum] = StatusEnum.applied
    notes: Optional[str] = None

class JobOut(JobCreate):
    id: int
    created_at: datetime
    owner_id: int
    class Config:
        from_attributes = True

