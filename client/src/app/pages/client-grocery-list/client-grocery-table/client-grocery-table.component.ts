import { Component } from '@angular/core';

@Component({
  selector: 'app-client-grocery-table',
  templateUrl: './client-grocery-table.component.html',
  styleUrls: ['./client-grocery-table.component.scss']
})
export class ClientGroceryTableComponent {
  rows = [
    { product: 'Cucumber', date: '2020-01-30', quantity: 4 },
    { product: 'Orange', date: '2020-01-30', quantity: 8 },
    { product: 'Cauliflower', date: '2020-01-30', quantity: 12 },
    { product: 'Beef', date: '2020-01-30', quantity: 1 },
    { product: 'Labane', date: '2020-01-30', quantity: 23 }
  ];
}
