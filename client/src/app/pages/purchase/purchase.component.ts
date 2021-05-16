import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
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
    const requests = {
      products: this.apiService.get('product'),
      myProducts: this.apiService.get(`my-product/${this.authService.user.userName}`)
    };
    forkJoin(requests).subscribe((response: any) => {
      if (!response?.products?.isSuccess || !response?.myProducts?.isSuccess) {
        this.toastrService.error('error getting purchase list');
      } else {
        this.products = response.products.data
            .filter(product => response.myProducts.data.includes(product.id))
            .map(product => ({ id: product.id, name: product.name, isSelected: false, quantity: 0 }));
        }
      }
    );
  }

  onSelectProduct(e, product) {
    product.isSelected = e.target.checked;
  }

  onClickSubmit() {
    const data = this.products
        .filter(product => product.isSelected)
        .map(product => ({ id: product.id, quantity: Number(product.quantity) }));





console.log(data);
return;
    // for (const product of this.products) {
    //   if (product.isSelected && !product.isOrgSelected) {
    //     add.push(product.id);
    //   } else if (!product.isSelected && product.isOrgSelected) {
    //     remove.push(product.id);
    //   }
    // }
    //
    // if (add.length > 0 || remove.length > 0) {
    //   const data: any = {};
    //   if (add.length > 0) data.add = add;
    //   if (remove.length > 0) data.remove = remove;
    //   this.apiService.post(`my-product/${this.authService.user.userName}`, data).subscribe((response: ServerResponse) => {
    //     if (!response.isSuccess) {
    //       this.toastrService.error(response?.error?.message || 'error updating my products');
    //     } else {
    //       this.toastrService.success('my products were updated successfully');
    //     }
    //   });
    // }
  }
}
