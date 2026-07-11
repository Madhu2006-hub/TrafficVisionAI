from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine

# Import Models
from models.user import User
from models.traffic import Traffic

# Import Routers
from routers.auth import router as auth_router
from routers.traffic import router as traffic_router
from routers.dashboard import router as dashboard_router
from routers.profile import router as profile_router
app = FastAPI(
    title="TrafficVision AI"
)

# -------------------------------
# Enable CORS
# -------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# Create Database Tables
# -------------------------------
Base.metadata.create_all(bind=engine)

# -------------------------------
# Include Routers
# -------------------------------
app.include_router(auth_router)
app.include_router(traffic_router)
app.include_router(dashboard_router)
app.include_router(profile_router)
# -------------------------------
# Home API
# -------------------------------


@app.get("/")
def home():
    return {
        "message": "TrafficVision AI Backend Running Successfully"
    }
