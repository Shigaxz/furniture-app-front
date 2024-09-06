import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BodegaAddPage } from './bodega-add.page';

const routes: Routes = [
  {
    path: '',
    component: BodegaAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BodegaAddPageRoutingModule {}
