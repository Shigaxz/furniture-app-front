import { Component } from '@angular/core';
import { CartService } from '../cart.service';

import { ClProducto } from '../model/ClProducto';
import { ProductServiceService } from '../product-service.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  products: ClProducto[] = [];
  cart: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService,
    public restApi: ProductServiceService,
    public loadingController: LoadingController) {}
  ionViewWillEnter() {
    this.cart = this.cartService.getCart();
    this.calculateTotal();
  }
  removeProduct(product: any) {
    this.cartService.removeFromCart(product);

    this.cart = this.cartService.getCart();
    this.total = this.cartService.getTotal();
  }
  private calculateTotal() {
    this.total = this.cartService.getTotal();
  }

  public clearCart(){
    this.cart=[]
    this.total = 0;
  }
  async getProducts() {
    console.log("Entrando :getProducts");
    // Crea un Wait (Esperar)
    const loading = await this.loadingController.create({
      message: 'Harrys Loading...'
    });
    // Muestra el Wait
    await loading.present();
    console.log("Entrando :");
    // Obtiene el Observable del servicio
    await this.restApi.getProducts()
      .subscribe({
        next: (res) => {
          console.log("Res:" + res);
  // Si funciona asigno el resultado al arreglo productos
          this.products = res;
          console.log("thisProductos:",this.products);
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
