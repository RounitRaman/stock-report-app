import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  symbol: string = '';

  constructor(private router: Router) {}

  fetchStock() {
    if (!this.symbol || !this.symbol.trim()) {
      return;
    }

    // Navigate to stock details page with symbol as route parameter
    this.router.navigate(['/stock', this.symbol.toUpperCase().trim()]);
  }
}
