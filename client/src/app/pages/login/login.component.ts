import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { ApiService } from '../../shared/services/api.service';
import { ServerResponse } from '../../shared/models/server-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private apiService: ApiService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      this.errorMessage = 'please fill in user name and password';
    } else {
      this.submit();
    }
  }

  submit() {
    this.apiService.post('auth/login', this.form.value).subscribe((response: ServerResponse) => {
      if (!response.isSuccess) {
        this.errorMessage = response.error.message;
      } else {
        this.authService.setUser(response.data);
        this.router.navigate(['/']);
      }
    });
  }
}
