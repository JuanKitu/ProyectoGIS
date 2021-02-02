import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanLoad } from '@angular/router';
import { LoginGuard } from './services/guards/login-guard.guard';

const routes: Routes = [
  { 
    path: '', redirectTo: 'home', pathMatch: 'full',
   },
  { 
    /* canLoad:[LoginGuard], */
    path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  {
  
    path: 'ensayo',
    loadChildren: () => import('./pages/ensayo/ensayo.module').then( m => m.EnsayoPageModule),
    /* canLoad:[LoginGuard] */
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
    /* canLoad:[LoginGuard], */
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
