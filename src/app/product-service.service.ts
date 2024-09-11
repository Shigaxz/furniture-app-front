import { Injectable } from '@angular/core';
import { ClProducto } from './model/ClProducto';
import { ClComentario } from './model/ClComentario';

import { Observable, of} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// creamos Constantes que utilizaremos en el envio
const apiUrl = "https://forniture-api.netlify.app/.netlify/functions/server/api/productos";
const apiCom = "https://forniture-api.netlify.app/.netlify/functions/server/api/comentarios";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  constructor(private http: HttpClient) { }
 
  addProduct(product: ClProducto): Observable<ClProducto> {
    return this.http.post<ClProducto>(apiUrl, product, httpOptions);
  }
  getProducts(): Observable<ClProducto[]> {
    console.log("getProducts ()");
    return this.http.get<ClProducto[]>(apiUrl);
  }

  getProduct(id: number): Observable<ClProducto> {
    console.log("getProduct ID:" + id);
    return this.http.get<ClProducto>(apiUrl + "/" + id);
  }

  deleteProduct(id: number): Observable<ClProducto> {
    return this.http.delete<ClProducto>(apiUrl + "/" + id, httpOptions);
  }
  updateProduct(id: number, product: ClProducto): Observable<ClProducto> {
    return this.http.put<ClProducto>(apiUrl + "/" + id, product, httpOptions);
  }
  addComentario(comentario: ClComentario): Observable<ClComentario> {
    console.log("Res-api Enviando addComentario : ", comentario);
    return this.http.post<ClComentario>(apiCom, comentario, httpOptions);
  }
  getComentarios(): Observable<ClComentario[]> {
    console.log("getProducts ()");
    return this.http.get<ClComentario[]>(apiCom);
  }

}
