import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Rol } from '../../models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(
    private http: HttpClient
  ) { }

  getRoles() {
    return this.http.get<Rol>(`${environment.ApiService}/Roles/GetRoles`);
  }
}
