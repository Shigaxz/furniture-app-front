import { Component , ViewChild } from '@angular/core';
import { CartService } from '../cart.service';
import { DataService } from '../data.service';
import { Router, NavigationExtras } from '@angular/router';

import { ClProducto } from '../model/ClProducto';
import { ProductServiceService } from '../product-service.service';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  products: ClProducto[] = [];
  productosFiltrados: ClProducto[] = []; 
  terminoBusqueda: string = '';
  @ViewChild('searchBar') searchBar: any;

  constructor(private cartService: CartService , 
    private dataService: DataService,
    public restApi: ProductServiceService,
    public loadingController: LoadingController,
    private router:Router,
    private navCtrl: NavController
    ) {}

  addToCart(product: any) {
    this.cartService.addToCart(product);}
    get productss() {
      return this.dataService.products;
  }
  
  ngOnInit() {
    this.getProducts();
    this.filtrarProductos();
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
          this.products = res.filter(producto => producto.stock >= 1);;
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
  
  filtrarProductos() {
    if (this.terminoBusqueda.trim() === '') {
      this.productosFiltrados = [];
    } else {
      this.productosFiltrados = this.products.filter(producto =>
        producto.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
      );
    }
  }
  
  
  
  

  viewProductDetails(product: ClProducto) {
    this.router.navigate(['product-details'], {
      state: { product: product }
    });}
  
    ngAfterViewInit() {
      document.addEventListener('click', (event) => {
        if (!this.searchBar._elementRef.nativeElement.contains(event.target)) {
          this.searchBar.setFocus(false);
        }
      });}
      irFavoritos(){
        this.navCtrl.navigateRoot('favorites');
      }  
  }

