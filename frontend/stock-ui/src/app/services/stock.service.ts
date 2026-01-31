import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CompanyProfile {
  name: string;
  exchange: string;
  market_cap: number;
  industry: string;
}

export interface StockSummary {
  symbol: string;
  price: number;
  change_percent: number;
  history: any[];
  company: CompanyProfile;
}

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private readonly baseUrl = 'https://stock-report-backend-32js.onrender.com/api/stocks';

  constructor(private http: HttpClient) {}

  getStockSummary(symbol: string): Observable<StockSummary> {
    return this.http.get<StockSummary>(`${this.baseUrl}/${symbol}/summary`);
  }
  downloadReport(symbol: string) {
  return this.http.get(
    `${this.baseUrl}/${symbol}/report`,
    { responseType: 'blob' }
  );
}
}
