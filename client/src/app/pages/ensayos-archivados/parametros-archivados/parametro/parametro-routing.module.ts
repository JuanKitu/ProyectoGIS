import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParametroPage } from './parametro.page';

const routes: Routes = [
  {
    path: '',
    component: ParametroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametroPageRoutingModule {}
