import { Component } from '@angular/core';

@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.scss']
})
export class ReminderListComponent {
  products = [
    { id: 1, name: 'Cucumber', quantity: 6 },
    { id: 2, name: 'Orange', quantity: 4 },
    { id: 3, name: 'Cauliflower', quantity: 3 },
    { id: 4, name: 'Beef', quantity: 0 },
    { id: 5, name: 'Cheddar Cheese', quantity: 0 },
    { id: 6, name: 'Labane', quantity: 1 },
    { id: 7, name: 'Chocolate', quantity: 4 },
    { id: 8, name: 'Yogurt', quantity: 7 },
    { id: 9, name: 'Dairy Milk', quantity: 2 }
  ];
}
