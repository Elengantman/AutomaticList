import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { ServerResponse } from '../../../shared/models/server-response.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-grocery-table',
  templateUrl: './client-grocery-table.component.html',
  styleUrls: ['./client-grocery-table.component.scss']
})
export class ClientGroceryTableComponent {
  userName;
  fullName;
  products;

  constructor(private router: Router,
              private apiService: ApiService,
              private toastrService: ToastrService) {
    this.userName = this.router.getCurrentNavigation().extras?.state?.userName;
    this.fullName = this.router.getCurrentNavigation().extras?.state?.fullName?.toUpperCase();
    this.apiService.get(`recommend/${this.userName}`).subscribe((response: ServerResponse) => {
      if (!response?.isSuccess) {
        this.toastrService.error(response?.error?.message || 'error getting purchase list');
      } else {
        this.products = response.data;
      }
    });
  }
}
