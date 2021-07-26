import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario';
import { map } from 'rxjs/operators';

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

  editarUsuario(id: string, usuario: Usuario) {
    return this.http.put(`${environment.ApiService}/Usuarios/EditarUsuario?id=${id}`, usuario);
  }

  eliminaUsuario(id: string) {
    return this.http.delete(`${environment.ApiService}/Usuarios/EliminarUsuario?id=${id}`);
  }

  getUsuario(id: string) {
    return this.http.get<Usuario>(`${environment.ApiService}/Usuarios/GetUsuario?id=${id}`);
  }

  SaveFoto(formData: FormData) {
    return this.http.post(`${environment.ApiService}/Usuarios/SaveFoto`, formData);
  }

  UpdateFoto(formData: FormData) {
    return this.http.post(`${environment.ApiService}/Usuarios/UpdateFoto`, formData);
  }

  UpsertFoto(formData: FormData) {
    return this.http.post(`${environment.ApiService}/Usuarios/UpsertFoto`, formData);
  }
}
