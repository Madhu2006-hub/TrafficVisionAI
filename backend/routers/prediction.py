from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
import pandas as pd
import joblib

from database import get_db
from models.prediction import Prediction

router = APIRouter()

# Load trained AI model
model = joblib.load("ml_models/traffic_model.pkl")


@router.post("/predict")
def predict(
    hour: int,
    day: int,
    month: int,
    year: int,
    dayofweek: int,
    junction: int,
    db: Session = Depends(get_db)
):

    # Prepare input for prediction
    data = pd.DataFrame([{
        "Hour": hour,
        "Day": day,
        "Month": month,
        "Year": year,
        "DayOfWeek": dayofweek,
        "Junction": junction
    }])

    # Predict traffic
    prediction = model.predict(data)[0]

    # Congestion Level
    if prediction < 20:
        congestion = "Low"
    elif prediction < 50:
        congestion = "Medium"
    else:
        congestion = "High"

    # Recommendation
    recommendation = (
        "Use Alternate Route"
        if congestion == "High"
        else "Normal Route"
    )

    # Save prediction into MySQL
    prediction_record = Prediction(
        prediction_date=datetime(year, month, day).date(),
        hour=hour,
        junction=junction,
        predicted_vehicles=float(prediction),
        congestion=congestion,
        recommendation=recommendation
    )

    db.add(prediction_record)
    db.commit()
    db.refresh(prediction_record)

    # Return response
    return {
        "Date": f"{day}/{month}/{year}",
        "Hour": hour,
        "Junction": junction,
        "Predicted Vehicles": round(float(prediction), 2),
        "Congestion": congestion,
        "Recommendation": recommendation
    }


@router.get("/history")
def prediction_history(db: Session = Depends(get_db)):
    """
    Returns all previous traffic predictions.
    """

    predictions = db.query(Prediction).all()

    return predictions
