import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = 'ABC';

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.errorMessage = 'please fill in user name and password';
    } else {
      this.submit();
      alert('ok');
    }
  }

  submit() {
    // this.submitted = true;
    // this.authService.login({ userName: this.f.userName.value, password: this.f.password.value })
    //     .subscribe((response: ServerResponse) => {
    //           if (response.isSuccess) {
    //             this.router.navigate(['/dashboard']);
    //           } else {
    //             this.error = response.error.message;
    //           }
    //         },
    //         error => {
    //           this.error = error ? error.message || error : 'an error has occurred';
    //         });
  }
}
