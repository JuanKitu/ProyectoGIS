import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnsayoPage } from './ensayo.page';

const routes: Routes = [
  {
    path: '',
    component: EnsayoPage
  },
  //ruta child de parametros archivados
  {
    path: 'parametros',
    loadChildren: () => import('./parametros-archivados/parametros-archivados.module').then( m => m.ParametrosArchivadosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnsayoPageRoutingModule {}
