import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  template: '',
  styleUrls: []
})
export class StartComponent {
  constructor(private authService: AuthService,
              private router: Router) {
    const route = this.authService.isAdmin ? 'client-grocery-list' : 'recommended-list';
    this.router.navigate([route]);
  }
}
