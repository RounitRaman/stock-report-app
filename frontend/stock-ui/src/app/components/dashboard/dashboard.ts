import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StockService, StockSummary } from '../../services/stock.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {

  symbol: string = '';
  stockData?: StockSummary;
  loading = false;
  error = '';

  constructor(private stockService: StockService) {}

  fetchStock() {
    if (!this.symbol) {
      this.error = 'Please enter a stock symbol';
      return;
    }

    this.loading = true;
    this.error = '';

    this.stockService.getStockSummary(this.symbol.toUpperCase())
      .subscribe({
        next: data => {
          this.stockData = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Unable to fetch stock data';
          this.loading = false;
        }
      });
  }
  downloadReport() {

  if (!this.stockData) {
    return;
  }

  this.loading = true;

  this.stockService.downloadReport(this.stockData.symbol)
    .subscribe({
      next: blob => {

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.stockData?.symbol}_report.pptx`;
        a.click();

        window.URL.revokeObjectURL(url);
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to download report';
        this.loading = false;
      }
    });
}

}
