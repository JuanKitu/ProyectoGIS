import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginGuard } from './services/guards/login-guard.guard';

const routes: Routes = [
  { 
    canActivate:[LoginGuard],
    path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  {
    canActivate:[LoginGuard],
    path: 'ensayo',
    loadChildren: () => import('./pages/ensayo/ensayo.module').then( m => m.EnsayoPageModule)
  },
  {
    
    path: 'ensayo/lista',
    loadChildren: () => import('./pages/lista-ensayos/lista-ensayos.module').then( m => m.ListaEnsayosPageModule)
  },
  {
    path: 'ensayo/archivados',
    loadChildren: () => import('./pages/ensayos-archivados/ensayos-archivados.module').then( m => m.EnsayosArchivadosPageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./pages/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
