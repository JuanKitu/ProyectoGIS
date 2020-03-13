import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnsayosArchivadosPage } from './ensayos-archivados.page';

const routes: Routes = [
  {
    path: '',
    component: EnsayosArchivadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnsayosArchivadosPageRoutingModule {}
