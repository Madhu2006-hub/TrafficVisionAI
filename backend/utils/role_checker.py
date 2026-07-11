from fastapi import HTTPException


def admin_only(current_user):

    if current_user.role != "admin":
        raise HTTPException(
            status_code=403,
            detail="Access Denied! Admin Only"
        )

    return current_user


def operator_only(current_user):

    if current_user.role != "operator":
        raise HTTPException(
            status_code=403,
            detail="Access Denied! Traffic Operator Only"
        )

    return current_user
