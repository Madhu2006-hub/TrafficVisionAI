from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.traffic import Traffic
from schemas.traffic import TrafficCreate
from utils.auth import get_current_admin

router = APIRouter(
    prefix="/traffic",
    tags=["Traffic"]
)


# ==============================
# Add Traffic (Admin Only)
# ==============================
@router.post("/add")
def add_traffic(
    data: TrafficCreate,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):

    traffic = Traffic(
        location=data.location,
        vehicle_count=data.vehicle_count,
        congestion_level=data.congestion_level,
        road_status=data.road_status
    )

    db.add(traffic)
    db.commit()
    db.refresh(traffic)

    return {
        "message": "Traffic Added Successfully",
        "data": traffic
    }


# ==============================
# Get All Traffic
# ==============================
@router.get("/all")
def get_all_traffic(
    db: Session = Depends(get_db)
):

    traffic = db.query(Traffic).all()

    return traffic


# ==============================
# Get Single Traffic
# ==============================
@router.get("/{traffic_id}")
def get_single_traffic(
    traffic_id: int,
    db: Session = Depends(get_db)
):

    traffic = db.query(Traffic).filter(
        Traffic.id == traffic_id
    ).first()

    if not traffic:
        raise HTTPException(
            status_code=404,
            detail="Traffic Data Not Found"
        )

    return traffic


# ==============================
# Update Traffic (Admin Only)
# ==============================
@router.put("/update/{traffic_id}")
def update_traffic(
    traffic_id: int,
    data: TrafficCreate,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):

    traffic = db.query(Traffic).filter(
        Traffic.id == traffic_id
    ).first()

    if not traffic:
        raise HTTPException(
            status_code=404,
            detail="Traffic Data Not Found"
        )

    traffic.location = data.location
    traffic.vehicle_count = data.vehicle_count
    traffic.congestion_level = data.congestion_level
    traffic.road_status = data.road_status

    db.commit()
    db.refresh(traffic)

    return {
        "message": "Traffic Updated Successfully",
        "data": traffic
    }


# ==============================
# Delete Traffic (Admin Only)
# ==============================
@router.delete("/delete/{traffic_id}")
def delete_traffic(
    traffic_id: int,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):

    traffic = db.query(Traffic).filter(
        Traffic.id == traffic_id
    ).first()

    if not traffic:
        raise HTTPException(
            status_code=404,
            detail="Traffic Data Not Found"
        )

    db.delete(traffic)
    db.commit()

    return {
        "message": "Traffic Deleted Successfully"
    }
