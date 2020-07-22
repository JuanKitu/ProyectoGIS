import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParametrosArchivadosPage } from './parametros-archivados.page';

const routes: Routes = [
  {
    path: '',
    component: ParametrosArchivadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametrosArchivadosPageRoutingModule {}
