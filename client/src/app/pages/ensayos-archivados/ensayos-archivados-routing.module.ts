import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnsayosArchivadosPage } from './ensayos-archivados.page';

const routes: Routes = [
  {
    path: '',
    component: EnsayosArchivadosPage
  },
  //ruta child de parametros archivados
  {
    path: 'parametros-archivados',
    loadChildren: () => import('./parametros-archivados/parametros-archivados.module').then( m => m.ParametrosArchivadosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnsayosArchivadosPageRoutingModule {}
