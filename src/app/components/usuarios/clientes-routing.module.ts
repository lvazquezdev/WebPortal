import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';

const routes: Routes = [
    {
        path: 'perfil-usuario',
        component: PerfilUsuarioComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientesRoutingModule { }