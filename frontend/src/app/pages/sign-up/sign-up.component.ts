import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { ApiService } from '../../shared/services/api.service';
import { Router } from '@angular/router';
import { ServerResponse } from '../../shared/models/server-response.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private apiService: ApiService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName:  ['', [Validators.required]],
      email:     ['', [Validators.required]],
      userName:  ['', [Validators.required]],
      password:  ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      this.errorMessage = 'please fill in all the fields';
    } else {
      const message = this.checkFormValidation(this.form.controls.firstName.value, this.form.controls.lastName.value);
      if (message) {
        this.errorMessage = message;
      } else {
        this.submit();
      }
    }
  }

  checkFormValidation(firstName, lastName) {
    let message = '';
    if (firstName.length < 2) {
      message = 'first name should be at least 2 characters';
    } else if (firstName.length > 15) {
      message = 'first name should be at most 15 characters';
    } else if (lastName.length < 2) {
      message = 'last name should be at least 2 characters';
    } else if (lastName.length > 15) {
      message = 'last name should be at most 15 characters';
    }
    return message;
  }

  submit() {
    this.apiService.post('auth/sign-up', this.form.value).subscribe((response: ServerResponse) => {
      if (!response.isSuccess) {
        this.errorMessage = response.error.message;
      } else {
        this.authService.setUser(response.data);
        this.router.navigate(['/']);
      }
    });
  }}
