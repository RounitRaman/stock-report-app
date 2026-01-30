from pydantic import BaseModel
from typing import List

class HistoricalPrice(BaseModel):
    date: str
    close: float

class CompanyProfile(BaseModel):
    name: str
    exchange: str
    market_cap: float
    industry: str

class StockSummary(BaseModel):
    symbol: str
    price: float
    change_percent: float
    history: List[HistoricalPrice]
    company: CompanyProfile
