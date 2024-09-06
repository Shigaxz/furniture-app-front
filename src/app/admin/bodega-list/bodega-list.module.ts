import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BodegaListPageRoutingModule } from './bodega-list-routing.module';

import { BodegaListPage } from './bodega-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BodegaListPageRoutingModule
  ],
  declarations: [BodegaListPage]
})
export class BodegaListPageModule {}
