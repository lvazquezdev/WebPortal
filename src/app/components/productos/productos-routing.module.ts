import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarproductosComponent } from './components/listarproductos/listarproductos.component';
import { NuevoproductoComponent } from './components/nuevoproducto/nuevoproducto.component';

const routes: Routes = [
    {
        path: 'lista-productos',
        component: ListarproductosComponent
    },
    {
        path: 'nuevo',
        component: NuevoproductoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductosRoutingModule { }