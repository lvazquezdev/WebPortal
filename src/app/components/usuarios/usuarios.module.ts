import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from "./usuarios-routing.module";
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './../../material/material.module';

import { ListausuariosComponent } from './components/listausuarios/listausuarios.component';
import { NuevousuarioComponent } from './components/nuevousuario/nuevousuario.component';
import { EditarusuarioComponent } from './components/editarusuario/editarusuario.component';
// import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';

@NgModule({
  declarations: [
    ListausuariosComponent,
    NuevousuarioComponent,
    EditarusuarioComponent,
    // PerfilUsuarioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
