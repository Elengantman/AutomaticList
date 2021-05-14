import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-grocery-table',
  templateUrl: './client-grocery-table.component.html',
  styleUrls: ['./client-grocery-table.component.scss']
})
export class ClientGroceryTableComponent {
  clientId;

  constructor(private router: Router) {
    console.log('state:', this.router.getCurrentNavigation().extras?.state);
    const clientId = this.router.getCurrentNavigation().extras?.state?.clientId;
    console.log('clientId:', typeof clientId, clientId);
    if (clientId) {
      this.clientId = clientId;
    }
  }

  rows = [
    { date: '2020-01-30', product: 'Cucumber', quantity: 4 },
    { date: '2020-01-30', product: 'Orange', quantity: 8 },
    { date: '2020-01-30', product: 'Cauliflower', quantity: 12 },
    { date: '2020-01-30', product: 'Beef', quantity: 1 },
    { date: '2020-01-30', product: 'Labane', quantity: 23 }
  ];
}
