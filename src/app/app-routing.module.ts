import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    loadChildren: () => import('./login/login.module').then(l => l.LoginModule)
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () => import('./home/home.module').then(h => h.HomeModule)
      },
      {
        path: 'usuarios'
        , data: { expectedRole: 'Administrador' }
        , canActivate: [AuthGuard, RoleGuard]
        , loadChildren: () => import('./components/usuarios/usuarios.module').then(a => a.UsuariosModule)
      },
      {
        path: 'productos'
        , data: { expectedRole: 'Administrador' }
        , canActivate: [AuthGuard, RoleGuard]
        , loadChildren: () => import('./components/productos/productos.module').then(a => a.ProductosModule)
      },
      {
        path: 'roles'
        , data: { expectedRole: 'Administrador' }
        , canActivate: [AuthGuard, RoleGuard]
        , loadChildren: () => import('./components/roles/roles.module').then(a => a.RolesModule)
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      preloadingStrategy: PreloadAllModules
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
