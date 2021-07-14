import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarolesComponent } from './components/listaroles/listaroles.component';
import { NuevorolComponent } from './components/nuevorol/nuevorol.component';

const routes: Routes = [
    {
        path: 'lista-roles',
        component: ListarolesComponent
    },
    {
        path: 'nuevo',
        component: NuevorolComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RolesRoutingModule { }