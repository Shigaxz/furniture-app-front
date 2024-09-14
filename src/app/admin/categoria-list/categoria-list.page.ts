import { Component, OnInit } from '@angular/core';


import { ClCategoria } from '../../model/ClCategoria';
import { CategoriaServiceService } from '../categoria-add/categoria-service.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { LoginServiceService } from 'src/app/tab3/login-service.service';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.page.html',
  styleUrls: ['./categoria-list.page.scss'],
})
export class CategoriaListPage implements OnInit {
  categoriass: ClCategoria[] = [];
  constructor(
    public restApi: CategoriaServiceService,
    public loadingController: LoadingController,
    private user: LoginServiceService
  ) { }

  ngOnInit() {
    this.getCategorias();
    this.user.verificarRol(1, this.user.usuario.role, this.user.sesion);
  }

  async getCategorias() {
    console.log("Entrando :getProducts");
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    console.log("Entrando :");
    await this.restApi.getCategorias()
      .subscribe({
        next: (res) => { 
          console.log("Res:" + res);
          this.categoriass = res;
          console.log("thisProductos:",this.categoriass);
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
