import { Injectable } from '@angular/core';
import { ClDetalleV } from './model/ClDetalleV';

// Importamos  las librerías necesarias
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { core } from '@angular/compiler';

// creamos Constantes que utilizaremos en el envio
const apiUrl = "http://localhost:3000/Detalle_ven";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
@Injectable({
  providedIn: 'root'
})
export class DetalleServiceService {
  constructor(private http: HttpClient) { }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("handleError Harrys", error); // log to console instead
      return of(result as T);
    };
  }
  addDetalle(Detalle_ven: ClDetalleV): Observable<ClDetalleV> {
    console.log("Res-api Enviando AddProduct : ", Detalle_ven);
    return this.http.post<ClDetalleV>(apiUrl, Detalle_ven, httpOptions)
      .pipe(
        tap((Detalle_ven: ClDetalleV) => console.log('added DETALLE w/:', Detalle_ven)),
        catchError(this.handleError<ClDetalleV>('addProduct'))
      );
  }
  getDetalles(): Observable<ClDetalleV[]> {
    console.log("getProducts ()");
    return this.http.get<ClDetalleV[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  getdetalle(id: String): Observable<ClDetalleV> {
    console.log("getProduct ID:" + id);
    return this.http.get<ClDetalleV>(apiUrl + "/" + id)
      .pipe(
        tap(_ => console.log('fetched product id=${id}')),
        catchError(this.handleError<ClDetalleV>('getProduct id=${id}'))
      );
  }}