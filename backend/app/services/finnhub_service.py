import requests
from typing import List

from app.services.base_provider import BaseStockProvider
from app.models.stock_models import HistoricalPrice, CompanyProfile
from app.core.config import settings
from app.core.logger import logger


class FinnhubService(BaseStockProvider):

    BASE_URL = "https://finnhub.io/api/v1"

    def __init__(self):
        self.api_key = settings.FINNHUB_API_KEY

    def _get(self, endpoint: str, params: dict):
        try:
            params["token"] = self.api_key
            response = requests.get(f"{self.BASE_URL}/{endpoint}", params=params, timeout=10)
            response.raise_for_status()
            return response.json()
        except Exception as ex:
            logger.error(f"Finnhub API error: {ex}")
            raise

    def get_current_price(self, symbol: str) -> float:
        data = self._get("quote", {"symbol": symbol})

        if not data or "c" not in data:
            raise ValueError("Invalid price data received from Finnhub")

        return float(data["c"])

    def get_historical_prices(self, symbol: str):
        return []

    def get_company_profile(self, symbol: str) -> CompanyProfile:
        data = self._get("stock/profile2", {"symbol": symbol})

        if not data:
            raise ValueError("Company profile not found")

        return CompanyProfile(
            name=data.get("name", ""),
            exchange=data.get("exchange", ""),
            market_cap=float(data.get("marketCapitalization", 0)),
            industry=data.get("finnhubIndustry", "")
        )
