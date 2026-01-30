from fastapi import FastAPI
from app.api.stock_routes import router as stock_router
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(title="Stock Report API")
# CORS configuration (frontend allowed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(stock_router, prefix="/api/stocks")

@app.get("/health")
def health():
    return {"status": "ok"}
