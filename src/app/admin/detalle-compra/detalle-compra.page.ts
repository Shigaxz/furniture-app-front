import { Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';

import { ClDetalleC } from '../../model/ClDetalleC';
import { DetalleCompraService } from './detalle-compra.service';

import { ClBodega } from '../../model/ClBodega';
import { BodegaService } from '../bodega-add/bodega.service';

import { ClProducto } from '../../model/ClProducto';
import { ProductServiceService } from '../../product-service.service';

import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/tab3/login-service.service';

@Component({
  selector: 'app-detalle-compra',
  templateUrl: './detalle-compra.page.html',
  styleUrls: ['./detalle-compra.page.scss'],
})
export class DetalleCompraPage implements OnInit {
  bodegas: ClBodega[] = [];
  detalleForm!: FormGroup;
  detalleC: ClDetalleC = {
    id: 0
    , sucursal: ''
    , prod: 0
    , stock: 0
  };
  reponer_stock!: ClProducto;

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private restApi: DetalleCompraService,
    private restApi2: BodegaService,
    private restApi3: ProductServiceService,
    private router: Router,
    public route: ActivatedRoute,
    private user: LoginServiceService) { }

  ngOnInit() {
    this.getBodegas();
    this.detalleForm = this.formBuilder.group({
      "detalle_sucursal": ['Seleccione sucursal', Validators.required],
      'detalle_prod': [null, Validators.required],
      'detalle_stock': [null, Validators.required],
    });
    this.user.verificarRol(1, this.user.usuario.role, this.user.sesion);
  }

  async onFormSubmit(form: NgForm) {
    console.log("onFormSubmit del Product ADD")
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();

    await this.restApi.addDetalleC(this.detalleC)
      .subscribe({
        next: (res) => {
          // INTENTO DE AGREGAR STOCK
          this.getProduct();


          //FIN DE INTENTO DE AGREGAR STOCK XD
          console.log("Next addDetalleC Page",res)
          loading.dismiss();
          if (res== null){
            console.log("Next No Agrego, Ress Null ");
            return
          }
          // Si viene respuesta
          console.log("Next Agrego SIIIIII Router saltaré ;",this.router);
        }
        , complete: () => { }
        , error: (err) => {
          console.log("Error addDetalleC Página",err);
          loading.dismiss();
        }
      });
    console.log("Observe que todo lo del suscribe sale después de este mensaje")
  }


  async getBodegas() {
    console.log("Entrando :getProducts");
    // Crea un Wait (Esperar)
    const loading = await this.loadingController.create({
      message: 'Harrys Loading...'
    });
    // Muestra el Wait
    await loading.present();
    console.log("Entrando :");
    // Obtiene el Observable del servicio
    await this.restApi2.getBodegas()
      .subscribe({
        next: (res) => {
          console.log("Res:" + res);
  // Si funciona asigno el resultado al arreglo productos
          this.bodegas = res;
          console.log("thisProductos:",this.bodegas);
          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
  // Si da error, imprimo en consola.
          console.log("Err:" + err);
          loading.dismiss();
        }
      })
  }

  async getProduct() {
    console.log("getProduct **************** ParamMap ID:" + this.route.snapshot.paramMap.get('this.detalleC.prod'));
    // Creamos un Wait
    const loading = await this.loadingController.create({ message: 'Loading...' });
    // Mostramos el Wait
    await loading.present();
    await this.restApi3.getProduct(this.detalleC.prod)
      .subscribe({
        next: (res) => {
          console.log("Data *****************");
          console.log(res);
          // Si funciona la respuesta la pasamos al producto
          this.reponer_stock = res;
          this.setStock(this.detalleC.prod, this.reponer_stock, this.detalleC.stock);
          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
          //Si no funcion desplegamos en consola el error
          console.log("Error DetailProduct Página", err);
          loading.dismiss(); //Elimina la espera
        }
      })
  }
  async setStock(idProducto: number, reponer_stock: ClProducto, stockA: number) {
    alert("agregando stock a " + idProducto)
    this.reponer_stock.id = idProducto;
    this.reponer_stock.stock += stockA;
    await this.restApi3.updateProduct(idProducto, reponer_stock)
    .subscribe({
      next: (res) => {
        let idProducto = res['id'];
        alert("Stock agregado correctamente" + idProducto)
      }
      , complete: () => { }
      , error: (err) => { console.log(err); }
    })

  }

}
