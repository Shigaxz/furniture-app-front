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


  // LLamamos al método que rescata los productos  
  
   
 ;
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
  filtrarProductos() {
    if (this.terminoBusqueda.trim() === '') {
      // Si el término de búsqueda está vacío, muestra una lista vacía
      this.productosFiltrados = [];
    } else {
      // Si hay un término de búsqueda, filtra los productos
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
      // Escucha el evento de clic en cualquier parte de la página
      document.addEventListener('click', (event) => {
        // Verifica si el clic ocurrió fuera del ion-searchbar
        if (!this.searchBar._elementRef.nativeElement.contains(event.target)) {
          // Desenfoca el ion-searchbar
          this.searchBar.setFocus(false);
        }
      });}
      irFavoritos(){
        this.navCtrl.navigateRoot('favorites');
      }  
  }

