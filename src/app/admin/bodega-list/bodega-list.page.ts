import { Component, OnInit } from '@angular/core';

import { ClBodega } from '../../model/ClBodega';
import { BodegaService } from '../bodega-add/bodega.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-bodega-list',
  templateUrl: './bodega-list.page.html',
  styleUrls: ['./bodega-list.page.scss'],
})
export class BodegaListPage implements OnInit {
  bodegas: ClBodega[] = [];
  constructor(
    public restApi: BodegaService,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.getBodegas();
  }
  async getBodegas() {
    console.log("Entrando :getProducts");
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    console.log("Entrando :");
    await this.restApi.getBodegas()
      .subscribe({
        next: (res) => { 
          console.log("Res:" + res);
          this.bodegas = res;
          console.log("thisProductos:",this.bodegas);
          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
          console.log("Err:" + err);
          loading.dismiss();
        }
      })
  }

}
