from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/jobs", tags=["jobs"])

@router.get("/", response_model=List[schemas.JobOut])
def get_jobs(db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    return db.query(models.Job).filter(models.Job.owner_id == current_user.id).all()

@router.post("/", response_model=schemas.JobOut)
def create_job(job: schemas.JobCreate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    new_job = models.Job(**job.dict(), owner_id=current_user.id)
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    return new_job

@router.delete("/{job_id}")
def delete_job(job_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    job = db.query(models.Job).filter(models.Job.id == job_id, models.Job.owner_id == current_user.id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    db.delete(job)
    db.commit()
    return {"message": "Deleted"}