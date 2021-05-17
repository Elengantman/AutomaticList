import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ServerResponse } from '../../shared/models/server-response.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-product-setup',
  templateUrl: './product-setup.component.html',
  styleUrls: ['./product-setup.component.scss']
})
export class ProductSetupComponent {
  products;
  departments;
  departmentNames;
  addForm: FormGroup;
  modalRef: BsModalRef;
  deleteId;
  deleteName;
  isAddState = false;
  addedDepartmentId;
  addErrorMessage = '';

  constructor(private apiService: ApiService,
              private authService: AuthService,
              private toastrService: ToastrService,
              private modalService: BsModalService,
              private formBuilder: FormBuilder) {
    this.addForm = this.formBuilder.group({
      name:       ['', [Validators.required, Validators.minLength(2)]],
      price:      ['', [Validators.required]],
      department: ['', [Validators.required]]
    });
    this.fetchData();
  }

  fetchData() {
    const requests = {
      productSetup: this.apiService.get(`product-setup`),
      departments: this.apiService.get(`department`)
    };
    forkJoin(requests).subscribe((response: any) => {
      if (!response?.productSetup?.isSuccess || !response?.departments?.isSuccess) {
        this.toastrService.error(response?.error?.message || 'error getting product setup');
      } else {
        this.departments = response.departments.data;
        this.departmentNames = this.departments.map(department => department.name);
        this.products = response.productSetup.data.map(product => ({ ...product, orgPrice: product.price  }));
      }
    });
  }

  onSelectDepartment(department) {
    this.addedDepartmentId = department.id;
  }

  onClickAdd() {
    this.isAddState = true;
    if (this.addForm.controls.name.value.length < 2) {
      this.addErrorMessage = 'product name should be at least 2 characters';
    } else if (this.isAddedProductExist()) {
      this.addErrorMessage = 'product already exist';
    } else if (typeof this.addForm.controls.price.value === 'string' || this.addForm.controls.price.value === 0) {
      this.addErrorMessage = 'please enter a price';
    } else if (!this.addForm.controls.department.value) {
      this.addErrorMessage = 'please enter a department';
    } else if (!this.getAddedDepartmentId()) {
      this.addErrorMessage = 'incorrect department';
    } else {
      const product = {
        name: this.addForm.controls.name.value,
        departmentId: this.addedDepartmentId,
        price: this.addForm.controls.price.value
      };
      this.apiService.post('product', product)
          .subscribe((response: ServerResponse) => {
            if (!response?.isSuccess) {
              this.toastrService.error(response?.error?.message || 'error adding product');
            } else {
              this.isAddState = false;
              this.addForm.reset();
              this.addErrorMessage = '';
              this.toastrService.success('product was added successfully');
              this.fetchData();
            }
          });
    }
  }

  isAddedProductExist() {
    const productNameLc = this.addForm.controls.name.value.toLowerCase();
    return this.products.some(product => product.name.toLowerCase() === productNameLc);
  }

  getAddedDepartmentId() {
    this.addedDepartmentId = this.departments.find(department => department.name === this.addForm.controls.department.value)?.id;
    return this.addedDepartmentId;
  }

  onClickDelete(id, template) {
    this.deleteId = id;
    this.deleteName = this.products.find(product => product.id === id).name;
    this.modalRef = this.modalService.show(template);
  }

  onConfirmDelete() {
    this.apiService.delete(`product/${this.deleteId}`).subscribe((response: ServerResponse) => {
      if (!response?.isSuccess) {
        this.toastrService.error(response?.error?.message || 'error deleting product');
      } else {
        this.modalRef.hide();
        this.toastrService.success('product was deleted successfully');
        this.fetchData();
      }
    });
  }

  onClickSubmit() {
    const data = this.products
        .filter(product => product.price !== product.orgPrice)
        .map(product => ({ id: product.id, price: product.price }));
    if (data.length === 0) {
      this.toastrService.info('no changes were made');
    } else {
      this.apiService.post(`product-setup`, data).subscribe((response: ServerResponse) => {
        if (!response?.isSuccess) {
          this.toastrService.error(response?.error?.message || 'error updating product setup');
        } else {
          this.toastrService.success('product setup was updated successfully');
        }
      });
    }
  }
}
