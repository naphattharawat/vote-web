import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuardService {
  constructor(private router: Router, private jwtHelper: JwtHelperService) { }

  canActivate() {
    try {
      const token = localStorage.getItem('token');
      // const decodeToken = this.jwtHelper.decodeToken(token);   
      if (token) {
        if (this.jwtHelper.isTokenExpired(token)) {
          this.router.navigate(['/login']);
          return false;
        } else {
          return true;
        }
      } else {
        this.router.navigate(['/login']);
        return false;
      }

    } catch (error) {
      return false;

    }
  }
}
