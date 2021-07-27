import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../../core/services/auth.service';
import decode from 'jwt-decode';
import { MenuItem } from '../../../models/Menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario: any;
  isLogin: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    const token = localStorage.getItem('token') as string;
    this.usuario = null;
    if (token) {
      this.isLogin = true;
      const { nombre, apellido, role }: any = decode(token);
      this.usuario = { nombre, apellido, role };
    } else {
      this.usuario = { role: 'Cliente' }
    }
  }

  ngOnInit(): void {
  }

  logOut() {
    this.authService.logOut();
  }

}
