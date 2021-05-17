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
  products;

  constructor(private apiService: ApiService,
              private authService: AuthService,
              private toastrService: ToastrService) {
    this.apiService.get(`my-list/${this.authService.user.userName}`).subscribe((response: ServerResponse) => {
      if (!response?.isSuccess) {
        this.toastrService.error(response?.error?.message || 'error getting my products');
      } else {
        this.products = response.data.map(item => ({ ...item, isOrgSelected: item.isSelected  }));
      }
    });
  }

  onSelectProduct(e, product) {
    product.isSelected = e.target.checked;
  }

  onClickSubmit() {
    const add = [];
    const remove = [];

    for (const product of this.products) {
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
          this.toastrService.success('my list was updated successfully');
        }
      });
    }
  }
}
