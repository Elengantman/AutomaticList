import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-client-report',
  templateUrl: './client-report.component.html',
  styleUrls: ['./client-report.component.scss']
})
export class ClientReportComponent {
  dateRange;
  users;
  products;
  isAdmin;
  selectedUser;
  selectedProduct;

  constructor(private router: Router,
              private apiService: ApiService,
              private toastrService: ToastrService,
              private authService: AuthService) {
    this.isAdmin = this.authService.isAdmin;
    if (this.isAdmin) {
      this.fetchData();
    } else {
      this.navigateToTablePage({ userName: this.authService.user.userName });
    }
  }

  fetchData() {
    const requests = {
      users: this.apiService.get(`user`),
      products: this.apiService.get(`product`)
    };

    forkJoin(requests).subscribe((response: any) => {
      if (!response?.users?.isSuccess || !response?.products?.isSuccess) {
        this.toastrService.error(response?.error?.message || 'error getting data from server');
      } else {
        this.users = response.users.data.map(user => ({ userName: user.userName, name: `${user.firstName} ${user.lastName}`}));
        this.products = response.products.data;
      }
    });
  }

  onSelectUser(selectedUser) {
    this.selectedUser = selectedUser;
  }

  onSelectProduct(selectedProduct) {
    this.selectedProduct = selectedProduct;
  }

  onClickSubmit() {
    const query: any = {};
    if (this.selectedUser) query.userName = this.selectedUser.userName;
    if (this.selectedProduct) query.productId = this.selectedProduct.id;
    if (this.dateRange) {
      query.fromDate = this.getDateString(this.dateRange[0]);
      query.toDate = this.getDateString(this.dateRange[1]);
    }
    this.navigateToTablePage(query);
  }

  navigateToTablePage(query) {
    this.router.navigate(['client-report-table'], { state: { query, fullName: this.getFullName() }});
  }

  getDateString(date) {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
  }

  getFullName() {
    return this.isAdmin ?  this.selectedUser?.name || '' : `${this.authService.user.firstName} ${this.authService.user.lastName}`;
  }
}
