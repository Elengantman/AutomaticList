import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ServerResponse } from '../../shared/models/server-response.model';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent {
  products;

  constructor(private apiService: ApiService,
              private authService: AuthService,
              private toastrService: ToastrService) {
    this.apiService.get(`purchase/${this.authService.user.userName}`).subscribe((response: ServerResponse) => {
      if (!response?.isSuccess) {
        this.toastrService.error(response?.error?.message || 'error getting purchase list');
      } else {
        this.products = response.data.map(product => ({ ...product, isSelected: false, quantity: 0 }));
      }
    });
  }

  onClickSubmit() {
    const data = this.products
        .filter(product => product.isSelected && product.quantity > 0)
        .map(product => ({ id: product.id, quantity: Number(product.quantity) }));
    if (data.length === 0) {
      this.toastrService.warning('no items to send');
    } else {
      this.apiService.post(`purchase/${this.authService.user.userName}`, data).subscribe((response: ServerResponse) => {
        if (!response.isSuccess) {
          this.toastrService.error(response?.error?.message || 'error making a purchase');
        } else {
          this.toastrService.success('purchase was received successfully');
        }
      });
    }
  }
}
