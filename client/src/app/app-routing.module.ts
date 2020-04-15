import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  {
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
    path: 'ensayo/lista',
    loadChildren: () => import('./pages/lista-ensayos/ensayo.module').then( m => m.EnsayoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
