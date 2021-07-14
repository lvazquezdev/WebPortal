import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListausuariosComponent } from './components/listausuarios/listausuarios.component';
import { NuevousuarioComponent } from './components/nuevousuario/nuevousuario.component';

const routes: Routes = [
    {
        path: 'lista-usuarios',
        component: ListausuariosComponent
    },
    {
        path: 'nuevo',
        component: NuevousuarioComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuariosRoutingModule { }