from abc import ABC, abstractmethod
from typing import List
from app.models.stock_models import HistoricalPrice, CompanyProfile

class BaseStockProvider(ABC):

    @abstractmethod
    def get_current_price(self, symbol: str) -> float:
        """Return latest stock price"""
        pass

    @abstractmethod
    def get_historical_prices(self, symbol: str) -> List[HistoricalPrice]:
        """Return historical prices"""
        pass

    @abstractmethod
    def get_company_profile(self, symbol: str) -> CompanyProfile:
        """Return company details"""
        pass
