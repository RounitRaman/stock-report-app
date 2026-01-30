from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    FINNHUB_API_KEY = os.getenv("FINNHUB_API_KEY")

settings = Settings()