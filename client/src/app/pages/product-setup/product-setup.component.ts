import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-setup',
  templateUrl: './product-setup.component.html',
  styleUrls: ['./product-setup.component.scss']
})
export class ProductSetupComponent implements OnInit {
  departments = {
    1: 'Fruits & Veggie',
    2: 'Diary',
    3: 'Meat',
    4: 'Snacks'
  };

  products: any[] = [
    { id: 1, name: 'Cucumber', price: 8, departmentId: 1 },
    { id: 2, name: 'Orange', price: 12, departmentId: 1 },
    { id: 3, name: 'Cauliflower', price: 25, departmentId: 1 },
    { id: 4, name: 'Beef', price: 4.90, departmentId: 2 },
    { id: 5, name: 'Cheddar Cheese', price: 11.7, departmentId: 2 },
    { id: 6, name: 'Labane', price: 82, departmentId: 3 },
    { id: 7, name: 'Chocolate', price: 17.5, departmentId: 3 },
    { id: 8, name: 'Yogurt', price: 29, departmentId: 4 },
    { id: 9, name: 'Dairy Milk', price: 18, departmentId: 4 },
    // { id: 1, name: 'Cucumber', price: 0, departmentId: 0 },
    // { id: 2, name: 'Orange', price: 0, departmentId: 0 },
    // { id: 3, name: 'Cauliflower', price: 0, departmentId: 0 },
    // { id: 4, name: 'Beef', price: 0, departmentId: 0 },
    // { id: 5, name: 'Cheddar Cheese', price: 0, departmentId: 0 },
    // { id: 6, name: 'Labane', price: 0, departmentId: 0 },
    // { id: 7, name: 'Chocolate', price: 0, departmentId: 0 },
    // { id: 8, name: 'Yogurt', price: 0, departmentId: 0 },
    // { id: 9, name: 'Dairy Milk', price: 0, departmentId: 0 }
  ];

  ngOnInit() {
    this.products.forEach(product => product.orgPrice = product.price);
  }

  onSelectProduct(e, product) {
    console.log(e.target.checked);
    // console.log({product});
  }

  onChangePrice(e, id) {
    console.log('change price', id, e.target.value);
  }
}
