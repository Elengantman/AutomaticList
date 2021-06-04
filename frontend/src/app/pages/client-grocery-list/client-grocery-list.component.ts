import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ServerResponse } from '../../shared/models/server-response.model';

@Component({
  selector: 'app-client-grocery-list',
  templateUrl: './client-grocery-list.component.html',
  styleUrls: ['./client-grocery-list.component.scss']
})
export class ClientGroceryListComponent {
  users;
  selectedUser;

  constructor(private router: Router,
              private apiService: ApiService,
              private toastrService: ToastrService) {
    this.apiService.get(`user`).subscribe((response: ServerResponse) => {
      if (!response?.isSuccess) {
        this.toastrService.error(response?.error?.message || 'error getting users');
      } else {
        this.users = response.data.map(user => ({ userName: user.userName, name: `${user.firstName} ${user.lastName}`}));
      }
    });
  }

  onSelectUser(selectedUser) {
    this.selectedUser = selectedUser;
  }

  onClickSubmit() {
    this.router.navigate(['client-grocery-table'], { state: { userName: this.selectedUser.userName, fullName: this.selectedUser.name }});
  }

}
