import os
from dotenv import load_dotenv
from pathlib import Path

# Load .env from backend directory
BASE_DIR = Path(__file__).resolve().parents[2]
load_dotenv(BASE_DIR / ".env")

class Settings:
    def __init__(self):
        self.FINNHUB_API_KEY = os.getenv("FINNHUB_API_KEY")

settings = Settings()
