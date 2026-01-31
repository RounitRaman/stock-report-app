from app.services.finnhub_service import FinnhubService

service = FinnhubService()

print(service.get_current_price("AAPL"))
print(service.get_company_profile("AAPL"))
print(service.get_historical_prices("AAPL")[:3])
