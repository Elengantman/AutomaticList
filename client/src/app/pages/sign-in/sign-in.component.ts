import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName:  ['', [Validators.required]],
      emailName: ['', [Validators.required]],
      userName:  ['', [Validators.required]],
      password:  ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      this.errorMessage = 'please fill in all the fields';
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
