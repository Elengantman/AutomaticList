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
  userName = '';
  fullName;
  productId = -1;
  productName = '';
  dateRange;
  users;
  products;
  isAdmin;

  constructor(private router: Router,
              private apiService: ApiService,
              private toastrService: ToastrService,
              private authService: AuthService) {
    this.isAdmin = this.authService.isAdmin;
    if (this.isAdmin) {
      this.fetchData();
    } else {
      this.fullName = `${this.authService.user.firstName} ${this.authService.user.lastName}`;
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

  onSelectUser(userIx) {
    this.userName = this.users[userIx].userName;
    this.fullName = this.users[userIx].name;
  }

  onSelectProduct(ix) {
    const product = this.products[ix];
    this.productId = product.id;
    this.productName = product.name;
  }

  onClickSubmit() {
    const query: any = { userName: this.userName };
    if (this.productId !== -1) query.productId = this.productId;
    if (this.dateRange) {
      query.fromDate = this.dateRange[0].toISOString().substr(0, 10);
      query.toDate = this.dateRange[1].toISOString().substr(0, 10);
    }
    this.navigateToTablePage(query);
  }

  navigateToTablePage(query) {
    this.router.navigate(['client-report-table'], { state: { query, fullName: this.fullName }});
  }
}
