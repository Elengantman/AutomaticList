import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-grocery-list',
  templateUrl: './client-grocery-list.component.html',
  styleUrls: ['./client-grocery-list.component.scss']
})
export class ClientGroceryListComponent {
  selectedIx = -1;

  clients = [
    { id: 1, name: 'Didi Manusi' },
    { id: 2, name: 'David Bowie' }
  ];

  constructor(private router: Router) {}

  onSelectClient(ix) {
    this.selectedIx = ix;
  }
  onClickSubmit() {
    this.router.navigate(['client-grocery-table']);
  }

}
