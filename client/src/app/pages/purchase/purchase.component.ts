import { Component } from '@angular/core';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent {
  products = [
    { id: 1, name: 'Cucumber', quantity: 0 },
    { id: 2, name: 'Orange', quantity: 0 },
    { id: 3, name: 'Cauliflower', quantity: 0 },
    { id: 4, name: 'Beef', quantity: 0 },
    { id: 5, name: 'Cheddar Cheese', quantity: 0 },
    { id: 6, name: 'Labane', quantity: 0 },
    { id: 7, name: 'Chocolate', quantity: 0 },
    { id: 8, name: 'Yogurt', quantity: 0 },
    { id: 9, name: 'Dairy Milk', quantity: 0 },
    // { id: 1, name: 'Cucumber', quantity: 0 },
    // { id: 2, name: 'Orange', quantity: 0 },
    // { id: 3, name: 'Cauliflower', quantity: 0 },
    // { id: 4, name: 'Beef', quantity: 0 },
    // { id: 5, name: 'Cheddar Cheese', quantity: 0 },
    // { id: 6, name: 'Labane', quantity: 0 },
    // { id: 7, name: 'Chocolate', quantity: 0 },
    // { id: 8, name: 'Yogurt', quantity: 0 },
    // { id: 9, name: 'Dairy Milk', quantity: 0 }
  ];

  onSelectProduct(e, product) {
    console.log(e.target.checked);
    // console.log({product});
  }
}
