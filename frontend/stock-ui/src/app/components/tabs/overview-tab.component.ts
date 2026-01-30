import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockSummary } from '../../services/stock.service';

@Component({
  selector: 'app-overview-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview-tab.html',
  styleUrls: ['./overview-tab.css']
})
export class OverviewTabComponent {
  @Input() stockData!: StockSummary;
}
