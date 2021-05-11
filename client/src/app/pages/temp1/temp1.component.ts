import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/Http';

@Component({
  selector: 'app-temp1',
  templateUrl: './temp1.component.html',
  styleUrls: ['./temp1.component.scss']
})
export class Temp1Component {

  userName = '';
  password = '';
  PreLogin = true;
  Logged = true;

  constructor(private router: Router, private http: HttpClient) {
  }

  public LoginSubmit() {

    // console.log(this.userName);
    const InfoCard =
        {
          UserName: this.userName,
          Password: this.password
        };
    this.http.post('/EnterToSite/Login/', InfoCard).subscribe(res => console.log(res));
    // console.log(this.password);
    this.Logged = false;
    this.PreLogin = true;

  }

  public SignInSubmit() {
    console.log('Signin');
    this.router.navigateByUrl('/Signin');
    this.Logged = true;
    this.PreLogin = false;

  }

}
