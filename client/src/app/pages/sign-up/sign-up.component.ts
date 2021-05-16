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
      this.submit();
    }
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
