import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-grocery-list',
  templateUrl: './client-grocery-list.component.html',
  styleUrls: ['./client-grocery-list.component.scss']
})
export class ClientGroceryListComponent {
  clientIx = -1;

  clients = [
    { id: 1, name: 'Didi Manusi' },
    { id: 2, name: 'David Bowie' }
  ];

  constructor(private router: Router) {}

  onSelectClient(ix) {
    this.clientIx = ix;
  }

  onClickSubmit() {
    this.router.navigate(['client-grocery-table'], { state: { clientId: this.clients[this.clientIx].id }});
  }

}
