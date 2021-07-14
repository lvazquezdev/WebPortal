import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ListarproductosComponent } from './components/listarproductos/listarproductos.component';
import { NuevoproductoComponent } from './components/nuevoproducto/nuevoproducto.component';

@NgModule({
  declarations: [
    ListarproductosComponent,
    NuevoproductoComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule
  ]
})
export class ProductosModule { }
