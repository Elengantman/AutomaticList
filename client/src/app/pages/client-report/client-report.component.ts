import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-client-report',
  templateUrl: './client-report.component.html',
  styleUrls: ['./client-report.component.scss']
})
export class ClientReportComponent {
  userName = '';
  productId = -1;
  productName = '';
  dateRange;
  users;
  products;

  constructor(private router: Router,
              private apiService: ApiService,
              private toastrService: ToastrService) {
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

  onSelectUser(ix) {
    this.userName = this.users[ix].userName;
  }

  onSelectProduct(ix) {
    const product = this.products[ix];
    this.productId = product.id;
    this.productName = product.name;
  }

  onClickSubmit() {
    const state: any = { userName: this.userName };
    if (this.productId !== -1) state.productId = this.productId;
    if (this.dateRange) {
      state.fromDate = this.dateRange[0].toISOString().substr(0, 10);
      state.toDate = this.dateRange[1].toISOString().substr(0, 10);
    }
    this.router.navigate(['client-report-table'], { state });
  }
}
