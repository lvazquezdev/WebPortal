import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { ListarolesComponent } from './components/listaroles/listaroles.component';
import { NuevorolComponent } from './components/nuevorol/nuevorol.component';

@NgModule({
  declarations: [
  
    ListarolesComponent,
       NuevorolComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule
  ]
})
export class RolesModule { }
