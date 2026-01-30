import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-reports-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports-tab.html',
  styleUrls: ['./reports-tab.css']
})
export class ReportsTabComponent {
  @Input() symbol: string = '';
  loading = false;
  error = '';

  constructor(private stockService: StockService) {}

  downloadReport() {
    if (!this.symbol) {
      this.error = 'Stock symbol is required';
      return;
    }

    this.loading = true;
    this.error = '';

    this.stockService.downloadReport(this.symbol)
      .subscribe({
        next: blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${this.symbol}_report.pptx`;
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
