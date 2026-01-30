import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { StockDetailsComponent } from './components/stock-details/stock-details';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'stock/:symbol',
    component: StockDetailsComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
