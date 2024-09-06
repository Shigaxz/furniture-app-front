import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { BodegaAddPageRoutingModule } from './bodega-add-routing.module';

import { BodegaAddPage } from './bodega-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BodegaAddPageRoutingModule,
  ],
  declarations: [BodegaAddPage]
})
export class BodegaAddPageModule {}
