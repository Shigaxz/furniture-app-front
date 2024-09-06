import { Injectable } from '@angular/core';
import { ClProducto } from './model/ClProducto';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: any[] = [];
  fav: any[] = [];
  constructor() {}

  addToCart(product: any) {
    this.cart.push(product);
  }

  addToFav(product: any) {
    this.fav.push(product);
  }

  getCart() {
    return this.cart;
  }

  getFavs() {
    return this.fav;
  }

  clearCart() {
    this.cart = [];
  }

  removeFromCart(product: any) {
    const index = this.cart.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
  }
  removeFromFavs(product: any) {
    const index = this.fav.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      this.fav.splice(index, 1);
    }
  }

  getTotal(): number {
    
    return this.cart.reduce((total, product) => total + product.precio , 0 ) ;
    
  }}
