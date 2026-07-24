from sqlalchemy import Column, Integer, String, Float
from database import Base


class Traffic(Base):

    __tablename__ = "traffic"

    id = Column(Integer, primary_key=True, index=True)

    location = Column(String(100), nullable=False)

    vehicle_count = Column(Integer, nullable=False)

    congestion_level = Column(String(30), nullable=False)

    road_status = Column(String(30), nullable=False)

    latitude = Column(Float, nullable=False)

    longitude = Column(Float, nullable=False)
