from fastapi import FastAPI
from app.api.stock_routes import router as stock_router

app = FastAPI(title="Stock Report API")

app.include_router(stock_router, prefix="/api/stocks")

@app.get("/health")
def health():
    return {"status": "ok"}
