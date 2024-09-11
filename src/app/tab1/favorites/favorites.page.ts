import { Component } from '@angular/core';
import { CartService } from '../../cart.service';

import { ClProducto } from '../../model/ClProducto';
import { ProductServiceService } from '../../product-service.service';
import { LoadingController } from '@ionic/angular';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage {
  products: ClProducto[] = [];
  cart: any[] = [];
  fav: any[] = [];
  total: number = 0;

  constructor(private dataService: DataService,
    private cartService: CartService,
    public restApi: ProductServiceService,
    public loadingController: LoadingController) {}
  ionViewWillEnter() {
    this.fav = this.cartService.getFavs();
  }
  removeProduct(product: any) {
    this.cartService.removeFromFavs(product);
    this.fav = this.cartService.getFavs();
  }
  addToCart(product: any) {
    this.cartService.addToCart(product);}
    get productss() {
      return this.dataService.products;
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
}
