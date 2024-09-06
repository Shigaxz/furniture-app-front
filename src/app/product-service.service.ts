import { Injectable } from '@angular/core';
import { ClProducto } from './model/ClProducto';
import { ClComentario } from './model/ClComentario';

// Importamos  las librerías necesarias
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

// creamos Constantes que utilizaremos en el envio
const apiUrl = "http://localhost:3000/productos";
const apiCom = "http://localhost:3000/comentario";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  constructor(private http: HttpClient) { }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("handleError Harrys", error); // log to console instead
      return of(result as T);
    };
  }
  addProduct(product: ClProducto): Observable<ClProducto> {
    console.log("Res-api Enviando AddProduct : ", product);
    return this.http.post<ClProducto>(apiUrl, product, httpOptions)
      .pipe(
        tap((product: ClProducto) => console.log('added product w/:', product)),
        catchError(this.handleError<ClProducto>('addProduct'))
      );
  }
  getProducts(): Observable<ClProducto[]> {
    console.log("getProducts ()");
    return this.http.get<ClProducto[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  getProduct(id: number): Observable<ClProducto> {
    console.log("getProduct ID:" + id);
    return this.http.get<ClProducto>(apiUrl + "/" + id)
      .pipe(
        tap(_ => console.log('fetched product id=${id}')),
        catchError(this.handleError<ClProducto>('getProduct id=${id}'))
      );
  }

  deleteProduct(id: number): Observable<ClProducto> {
    return this.http.delete<ClProducto>(apiUrl + "/" + id, httpOptions)
      .pipe(
        tap(_ => console.log('deleted product id=${id}')),
        catchError(this.handleError<ClProducto>('deleteProduct'))
      );
  }
  updateProduct(id: number, product: ClProducto): Observable<ClProducto> {
    return this.http.put<ClProducto>(apiUrl + "/" + id, product, httpOptions)
      .pipe(
        tap(_ => console.log('updated product id=${id}')),
        catchError(this.handleError<any>('updateProduct'))
      );
  }
  addComentario(comentario: ClComentario): Observable<ClComentario> {
    console.log("Res-api Enviando addComentario : ", comentario);
    return this.http.post<ClComentario>(apiCom, comentario, httpOptions)
      .pipe(
        tap((comentario: ClComentario) => console.log('added comentario w/:', comentario)),
        catchError(this.handleError<ClComentario>('addComentario'))
      );
  }
  getComentarios(): Observable<ClComentario[]> {
    console.log("getProducts ()");
    return this.http.get<ClComentario[]>(apiCom)
      .pipe(
        tap(heroes => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))

      );
  }


}
