from fastapi import APIRouter

router = APIRouter()

@router.get("/{symbol}/summary")
def summary(symbol: str):
    return {"symbol": symbol, "message": "Backend setup successful"}
