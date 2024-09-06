import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClProducto } from '../model/ClProducto';
import { ProductServiceService } from '../product-service.service';
import { ClComentario } from '../model/ClComentario';
import { CartService } from '../cart.service';
import { DataService } from '../data.service';

import { FormBuilder, FormGroup , NgForm, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  product: ClProducto;
  fav: any[] = [];
  comentarioForm!: FormGroup;
  comentario: ClComentario ={
    id: 0
    ,id_prod: 0
    ,user: ''
    ,resenna: ''
  };
  i: number = 0;
  comentarios: ClComentario[] = [];

  constructor(private dataService: DataService,
               private cartService: CartService,
               private route: ActivatedRoute,
               private formBuilder: FormBuilder,
               private loadingController: LoadingController,
               private restApi: ProductServiceService,
               private router: Router) {
    this.product = {} as ClProducto;
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const state = navigation.extras.state;
      if (state && 'product' in state) {
        this.product = state['product'];
      }
    }
    this.comentarioForm = this.formBuilder.group({
      'com_user': [null, Validators.required],
      'com_com': [null, Validators.required],
    });
    this.getComentarios();

  }
  addToCart(product: any) {
    this.cartService.addToCart(product);}
    get productss() {
      return this.dataService.products;
    }

  addToFav(product: any) {
    this.cartService.addToFav(product);}
    get products() {
      return this.dataService.products;
    }

    async onFormSubmit(form: NgForm) {
      console.log("onFormSubmit del Product ADD")
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await loading.present();

      this.comentario.id_prod = this.product.id;

      await this.restApi.addComentario(this.comentario)
        .subscribe({
          next: (res) => {
            console.log("Next addComentario Page",res)
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
            console.log("Error addComentario Página",err);
            loading.dismiss();
          }
        });
      console.log("Observe que todo lo del suscribe sale después de este mensaje")
    }

    async getComentarios() {
      let i: number = 0;
      console.log("Entrando :getProducts");
      // Crea un Wait (Esperar)
      const loading = await this.loadingController.create({
        message: 'Harrys Loading...'
      });
      // Muestra el Wait
      await loading.present();
      console.log("Entrando :");
      // Obtiene el Observable del servicio
      await this.restApi.getComentarios()
        .subscribe({
          next: (res) => {
            console.log("Res:" + res);
            this.comentarios = res.filter((com: ClComentario) => com.id_prod === this.product.id);
    // Si funciona asigno el resultado al arreglo productos
            console.log("thiscomentarios:",this.comentarios);
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
}
