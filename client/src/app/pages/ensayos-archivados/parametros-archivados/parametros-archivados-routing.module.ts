import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParametrosArchivadosPage } from './parametros-archivados.page';

const routes: Routes = [
  {
    path: '',
    component: ParametrosArchivadosPage
  },
  {
    path: ':idParametro',
    loadChildren: () => import('./parametro/parametro.module').then( m => m.ParametroPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametrosArchivadosPageRoutingModule {}
