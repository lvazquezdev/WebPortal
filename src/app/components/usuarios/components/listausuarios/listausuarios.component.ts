import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { UsuarioService } from './../../../../core/services/usuario.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from './../../../../models/usuario';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listausuarios',
  templateUrl: './listausuarios.component.html',
  styleUrls: ['./listausuarios.component.css']
})
export class ListausuariosComponent implements AfterViewInit {

  displayedColumns: string[] = ['PrimerNombre', 'SegundoNombre', 'ApellidoPaterno', 'ApellidoMaterno', 'Correo', 'Rol'];
  dataSource: any;
  usuarios: Usuario[] | undefined;
  usuario: any;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastrService
  ) {
    const token = localStorage.getItem('token') as string;
    if (token) {
      const { nombre, apellido, role }: any = decode(token);
      this.usuario = { nombre, apellido, role };

      if (role === "Admin") {
        this.displayedColumns.push('Actions');
      }
    }
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarioService.getUsuarios()
      .subscribe(u => {
        this.dataSource = new MatTableDataSource<Usuario>(u);
        this.dataSource.paginator = this.paginator;
      }, error => {
        alert(error.error.Message)
      });
  }

  deleteUser(id: string) {

    if (confirm("Esta seguro de eliminar el registro?")) {
      this.usuarioService.eliminaUsuario(id)
        .subscribe(res => {
          console.log(res);
          this.getUsuarios();
        });
    }
  }
}
