import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  constructor(public authService: AuthService,
              private router: Router) {
    // let page;
    // if (!this.authService.isLoggedIn) {
    //   page = 'login';
    // } else {
    //   page = 'update-list';
    // }
    // this.router.navigate([page]);
  }
}
