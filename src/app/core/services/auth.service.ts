import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { LoginModel } from './../../models/login';
import { JwtHelperService } from '@auth0/angular-jwt';

const headers = new HttpHeaders(
  {
    'Content-Type': 'application/json',
    //'Authorization': `Bearer ${token}`
  }
)

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) { }

  authenticate(login: LoginModel) {
    return this.http.post(`${environment.ApiService}/authenticate`, login, { headers: headers });
  }

  isAuth(): boolean {
    const token = localStorage.getItem('token') as string;
    if (this.jwtHelper.isTokenExpired(token) || !token) {
      return false;
    }
    return true;
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token') as string;
    if (token) {
      if (!this.jwtHelper.isTokenExpired(token) || token) {
        return true;
      }
    }
    return false;
  }



  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
