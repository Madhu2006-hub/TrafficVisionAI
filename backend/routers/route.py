from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.traffic import Traffic

router = APIRouter(
    prefix="/route",
    tags=["Route Prediction"]
)


@router.get("/best-route")
def best_route(
    db: Session = Depends(get_db)
):

    records = db.query(Traffic).all()

    if not records:
        raise HTTPException(
            status_code=404,
            detail="No traffic records found"
        )

    best = min(records, key=lambda x: x.vehicle_count)

    return {
        "best_route": best.location,
        "traffic": best.vehicle_count,
        "congestion": best.congestion_level,
        "road_status": best.road_status,
        "message": "Best route found successfully"
    }
# ==========================================
# Map Data API
# ==========================================


@router.get("/map")
def get_map_data(
    db: Session = Depends(get_db)
):

    records = db.query(Traffic).all()

    return [
        {
            "id": record.id,
            "location": record.location,
            "vehicle_count": record.vehicle_count,
            "congestion_level": record.congestion_level,
            "road_status": record.road_status,
            "latitude": record.latitude,
            "longitude": record.longitude
        }
        for record in records
    ]
