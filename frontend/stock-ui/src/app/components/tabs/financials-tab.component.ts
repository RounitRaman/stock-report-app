import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-financials-tab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="placeholder-container">
      <div class="placeholder-icon">💰</div>
      <h2 class="placeholder-title">Financials</h2>
      <p class="placeholder-text">Coming soon</p>
      <p class="placeholder-description">Financial statements, ratios, and key metrics will be displayed here.</p>
    </div>
  `,
  styles: [`
    .placeholder-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 400px;
      text-align: center;
      padding: 48px;
    }

    .placeholder-icon {
      font-size: 64px;
      margin-bottom: 16px;
    }

    .placeholder-title {
      font-size: 24px;
      font-weight: 600;
      color: #1a202c;
      margin: 0 0 12px 0;
    }

    .placeholder-text {
      font-size: 18px;
      font-weight: 500;
      color: #3182ce;
      margin: 0 0 8px 0;
    }

    .placeholder-description {
      font-size: 14px;
      color: #718096;
      margin: 0;
      max-width: 400px;
    }
  `]
})
export class FinancialsTabComponent {}
