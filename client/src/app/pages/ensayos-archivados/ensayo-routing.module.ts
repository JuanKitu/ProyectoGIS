import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnsayoPage } from './ensayo.page';

const routes: Routes = [
  {
    path: ':idEnsayo',
    component: EnsayoPage
  },
  {
    path: 'parametros-archivados',
    loadChildren: () => import('./parametros-archivados/parametros-archivados.module').then( m => m.ListaParametrosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnsayoPageRoutingModule {}
