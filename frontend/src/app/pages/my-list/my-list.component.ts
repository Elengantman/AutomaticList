import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { AuthService } from '../../shared/services/auth.service';
import { ServerResponse } from '../../shared/models/server-response.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent {
  allProducts;
  products;

  constructor(private apiService: ApiService,
              private authService: AuthService,
              private toastrService: ToastrService) {
    this.fetchData();
  }

  fetchData() {
    this.apiService.get(`my-list/${this.authService.user.userName}`).subscribe((response: ServerResponse) => {
      if (!response?.isSuccess) {
        this.toastrService.error(response?.error?.message || 'error getting my products');
      } else {
        this.allProducts = response.data.map(item => ({ ...item, isOrgSelected: item.isSelected  }));
        this.products = this.allProducts;
      }
    });
  }

  updateFilter(filter) {
    if (!filter) {
      this.products = this.allProducts;
    } else {
      filter = filter.toLowerCase();
      this.products = this.allProducts.filter(product => product.name.toLowerCase().includes(filter));
    }
  }

  onClickSubmit() {
    const add = [];
    const remove = [];

    for (const product of this.allProducts) {
      if (product.isSelected && !product.isOrgSelected) {
        add.push(product.id);
      } else if (!product.isSelected && product.isOrgSelected) {
        remove.push(product.id);
      }
    }

    if (add.length > 0 || remove.length > 0) {
      const data: any = {};
      if (add.length > 0) data.add = add;
      if (remove.length > 0) data.remove = remove;
      this.apiService.post(`my-list/${this.authService.user.userName}`, data).subscribe((response: ServerResponse) => {
        if (!response.isSuccess) {
          this.toastrService.error(response?.error?.message || 'error updating my list');
        } else {
          this.fetchData();
          this.toastrService.success('my list was updated successfully');
        }
      });
    }
  }
}
