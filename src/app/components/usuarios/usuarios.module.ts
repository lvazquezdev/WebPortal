import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from "./usuarios-routing.module";
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './../../material/material.module';

import { ListausuariosComponent } from './components/listausuarios/listausuarios.component';
import { NuevousuarioComponent } from './components/nuevousuario/nuevousuario.component';
import { EditarusuarioComponent } from './components/editarusuario/editarusuario.component';

@NgModule({
  declarations: [
    ListausuariosComponent,
    NuevousuarioComponent,
    EditarusuarioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
