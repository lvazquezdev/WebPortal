import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token') as string;
    const { role }: any = decode(token);

    if (!this.authService.isAuth() || expectedRole !== role) {
      console.log("Rol no autorizado!");
      return false
    }

    return true;
  }

}
