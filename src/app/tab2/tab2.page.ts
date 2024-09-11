import { Component } from '@angular/core';
import { CartService } from '../cart.service';

import { ClDetalleV } from '../model/ClDetalleV';
import { ClProducto } from '../model/ClProducto';
import { ProductServiceService } from '../product-service.service';
import { LoadingController } from '@ionic/angular';
import { LoginServiceService } from '../tab3/login-service.service';
import { DetalleServiceService } from '../detalle-venta.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  products: ClProducto[] = [];
  venta: ClDetalleV = {
    id: 0
    , idUser: 0
    , productos : []
    , plata: 0
  };
  cart: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService,
    public restApi: ProductServiceService,
    public loadingController: LoadingController,
    public user : LoginServiceService,
    private ventaApi: DetalleServiceService) {}
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
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    console.log("Entrando :");
    await this.restApi.getProducts()
      .subscribe({
        next: (res) => {
          console.log("Res:" + res);
          this.products = res;
          console.log("thisProductos:",this.products);
          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
          console.log("Err:" + err);
          loading.dismiss();
        }
      })
  }
  carritoCompra() {
    if (this.cart.length >= 1) {
      this.venta.productos = this.cart;
      this.venta.idUser = this.user.usuario.id;
      this.venta.plata = this.total;
      this.detalleVenta(this.venta);
    } else {
      alert("Debes seleccionar almenos un producto en el carrito");
    }
    this.clearCart();
    this.venta = {
      id: 0
      , idUser: 0
      , productos : []
      , plata: 0
    };
  }

  detalleVenta(venta : any ) {
    this.ventaApi.addDetalle(venta).subscribe(
      response => {
        console.log('Promoción añadida:', response);
      },
      error => {
        console.error('Error al añadir promoción:', error);
      }
    );
  }
}