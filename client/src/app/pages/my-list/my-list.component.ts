import { Component } from '@angular/core';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent {
  products = [
    { id: 1, name: 'Cucumber', isSelected: false },
    { id: 2, name: 'Orange', isSelected: false },
    { id: 3, name: 'Cauliflower', isSelected: false },
    { id: 4, name: 'Beef', isSelected: false },
    { id: 5, name: 'Cheddar Cheese', isSelected: false },
    { id: 6, name: 'Labane', isSelected: false },
    { id: 7, name: 'Chocolate', isSelected: false },
    { id: 8, name: 'Yogurt', isSelected: false },
    { id: 9, name: 'Dairy Milk', isSelected: false }
  ];

  onSelectProduct(e, product) {
    console.log(e.target.checked);
    // console.log({product});
  }
}
