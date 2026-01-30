import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { StockService, StockSummary } from '../../services/stock.service';
import { OverviewTabComponent } from '../tabs/overview-tab.component';
import { HistoricalDataTabComponent } from '../tabs/historical-data-tab.component';
import { FinancialsTabComponent } from '../tabs/financials-tab.component';
import { ReportsTabComponent } from '../tabs/reports-tab.component';

type TabType = 'overview' | 'historical' | 'financials' | 'reports';

@Component({
  selector: 'app-stock-details',
  standalone: true,
  imports: [
    CommonModule,
    OverviewTabComponent,
    HistoricalDataTabComponent,
    FinancialsTabComponent,
    ReportsTabComponent
  ],
  templateUrl: './stock-details.html',
  styleUrls: ['./stock-details.css']
})
export class StockDetailsComponent implements OnInit {
  symbol: string = '';
  stockData?: StockSummary;
  loading = false;
  error = '';
  activeTab: TabType = 'overview';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stockService: StockService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.symbol = params['symbol'];
      if (this.symbol) {
        this.loadStockData();
      }
    });

    // Check for tab query parameter
    this.route.queryParams.subscribe(params => {
      const tab = params['tab'];
      if (tab && ['overview', 'historical', 'financials', 'reports'].includes(tab)) {
        this.activeTab = tab as TabType;
      }
    });
  }

  loadStockData() {
    this.loading = true;
    this.error = '';

    this.stockService.getStockSummary(this.symbol)
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

  setActiveTab(tab: TabType) {
    this.activeTab = tab;
    // Update URL without reloading
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab },
      queryParamsHandling: 'merge'
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
