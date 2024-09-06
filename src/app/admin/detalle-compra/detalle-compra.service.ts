import { Injectable } from '@angular/core';
import { ClDetalleC } from '../../model/ClDetalleC';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const apiUrl = "http://localhost:3000/detalle-compra";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class DetalleCompraService {
  constructor(private http: HttpClient) { }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("handleError Harrys", error); // log to console instead
      return of(result as T);
    };
  }
  addDetalleC(detalle: ClDetalleC): Observable<ClDetalleC> {
    console.log("Res-api Enviando addCategoria : ", detalle);
    return this.http.post<ClDetalleC>(apiUrl, detalle, httpOptions)
      .pipe(
        tap((detalle: ClDetalleC) => console.log('added detalle w/:', detalle)),
        catchError(this.handleError<ClDetalleC>('addCategoria'))
      );
  }
  getDetalleCs(): Observable<ClDetalleC[]> {
    console.log("getCategorias ()");
    return this.http.get<ClDetalleC[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched detalle')),
        catchError(this.handleError('getCategorias', []))
      );
  }
}
