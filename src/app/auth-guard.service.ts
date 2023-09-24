import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { JwtHelper } from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuardService {
  constructor(private router: Router, private jwtHelper: JwtHelperService) { }

  canActivate() {
    const token = localStorage.getItem('mnm-token');
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
  }
}
