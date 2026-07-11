from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models.user import User
from models.traffic import Traffic
from utils.auth import get_current_admin

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):

    total_users = db.query(User).count()

    total_traffic_records = db.query(Traffic).count()

    high = db.query(Traffic).filter(
        Traffic.congestion_level == "High"
    ).count()

    medium = db.query(Traffic).filter(
        Traffic.congestion_level == "Medium"
    ).count()

    low = db.query(Traffic).filter(
        Traffic.congestion_level == "Low"
    ).count()

    return {
        "admin": current_user.name,
        "total_users": total_users,
        "traffic_records": total_traffic_records,
        "high_congestion": high,
        "medium_congestion": medium,
        "low_congestion": low
    }
