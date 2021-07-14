import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(
    private http: HttpClient
  ) { }

  getUsuarios() {
    return this.http.get<Usuario[]>(`${environment.ApiService}/usuarios/GetUsuarios`);
  }

  altaUsuario(usuario: Usuario) {
    return this.http.post(`${environment.ApiService}/Usuarios/AltaUsuario`, usuario);
  }

  eliminaUsuario(id: string) {
    return this.http.delete(`${environment.ApiService}/Usuarios/EliminarUsuario?id=${id}`);
  }
}
