from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from database import get_db
from models.user import User
from utils.jwt_handler import verify_access_token

# Swagger will use this login endpoint
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


# Get currently logged-in user
def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    payload = verify_access_token(token)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or Expired Token"
        )

    email = payload.get("sub")

    if email is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )

    user = db.query(User).filter(
        User.email == email
    ).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User Not Found"
        )

    return user


# Admin authorization
def get_current_admin(
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=403,
            detail="Access Denied"
        )

    return current_user


# Operator authorization
def get_current_operator(
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "operator":
        raise HTTPException(
            status_code=403,
            detail="Access Denied"
        )

    return current_user
