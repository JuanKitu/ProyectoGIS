import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnsayoPage } from './ensayo.page';

const routes: Routes = [
  {
    path: ':idEnsayo',
    component: EnsayoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnsayoPageRoutingModule {}
