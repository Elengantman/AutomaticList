import { Component } from '@angular/core';

@Component({
  selector: 'app-client-report',
  templateUrl: './client-report.component.html',
  styleUrls: ['./client-report.component.scss']
})
export class ClientReportComponent {
  clientIx = -1;
  productIx = -1;

  clients = [
    { id: 1, name: 'Didi Manusi' },
    { id: 2, name: 'David Bowie' }
  ];

  products = [
    { id: 1, name: 'Cucumber' },
    { id: 2, name: 'Orange' },
    { id: 3, name: 'Cauliflower' },
    { id: 4, name: 'Beef' },
    { id: 5, name: 'Cheddar Cheese' },
    { id: 6, name: 'Labane' },
    { id: 7, name: 'Chocolate' },
    { id: 8, name: 'Yogurt' },
    { id: 9, name: 'Dairy Milk' }
  ];

  onSelectClient(ix) {
    this.clientIx = ix;
  }

  onSelectProduct(ix) {
    this.productIx = ix;
  }
}
