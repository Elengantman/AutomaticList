import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Role } from '../enums/role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user: User;
  // isLoggedIn = false;
  // isAdmin = true;

  // TODO: test only
  user: User = { userName: 'zohars', firstName: 'Zohar', lastName: 'Sabari', role: Role.Admin, email: 'a', password: 'a' };
  isLoggedIn = true;
  isAdmin = true;

  setUser(user: User) {
    this.user = user;
    this.isLoggedIn = true;
    this.isAdmin = user.role === Role.Admin;
  }

  logout() {
    this.user = null;
    this.isLoggedIn = false;
    this.isAdmin = false;
  }
}
