import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ServerResponse } from '../../shared/models/server-response.model';

@Component({
  selector: 'app-product-setup',
  templateUrl: './product-setup.component.html',
  styleUrls: ['./product-setup.component.scss']
})
export class ProductSetupComponent {
  products;

  constructor(private apiService: ApiService,
              private authService: AuthService,
              private toastrService: ToastrService) {
    this.apiService.get(`product-setup`).subscribe((response: ServerResponse) => {
      if (!response?.isSuccess) {
        this.toastrService.error(response?.error?.message || 'error getting product setup');
      } else {
        this.products = response.data.map(product => ({ ...product, orgPrice: product.price  }));
      }
    });
  }

  onClickSubmit() {
    console.log(this.products);
    const data = this.products
        .filter(product => product.price !== product.orgPrice)
        .map(product => ({ id: product.id, price: product.price }));
    if (data.length === 0) {
      this.toastrService.info('no changes were made');
    } else {
      this.apiService.post(`product-setup`, data).subscribe((response: ServerResponse) => {
        if (!response.isSuccess) {
          this.toastrService.error(response?.error?.message || 'error updating product setup');
        } else {
          this.toastrService.success('product setup was updated successfully');
        }
      });
    }
  }
}
