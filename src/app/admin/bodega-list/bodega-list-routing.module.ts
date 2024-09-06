import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BodegaListPage } from './bodega-list.page';

const routes: Routes = [
  {
    path: '',
    component: BodegaListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BodegaListPageRoutingModule {}
