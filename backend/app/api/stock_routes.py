from fastapi import APIRouter, HTTPException

from app.services.finnhub_service import FinnhubService
from app.models.stock_models import StockSummary
from fastapi.responses import FileResponse
from pathlib import Path

from app.reports.ppt_generator import generate_stock_report

router = APIRouter()

# Initialize provider (later can swap to Eikon easily)
stock_provider = FinnhubService()


@router.get("/{symbol}/summary", response_model=StockSummary)
def get_stock_summary(symbol: str):

    try:
        price = stock_provider.get_current_price(symbol)
        company = stock_provider.get_company_profile(symbol)

        return StockSummary(
            symbol=symbol.upper(),
            price=price,
            change_percent=0.0,
            history=[],
            company=company
        )

    except Exception as ex:
        raise HTTPException(status_code=400, detail=str(ex))
    
@router.get("/{symbol}/report")
def download_stock_report(symbol: str):

    try:
        price = stock_provider.get_current_price(symbol)
        company = stock_provider.get_company_profile(symbol)

        stock_summary = StockSummary(
            symbol=symbol.upper(),
            price=price,
            change_percent=0.0,
            history=[],
            company=company
        )

        report_path = generate_stock_report(stock_summary)

        return FileResponse(
            path=report_path,
            filename=report_path.name,
            media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation"
        )

    except Exception as ex:
        raise HTTPException(status_code=400, detail=str(ex))
