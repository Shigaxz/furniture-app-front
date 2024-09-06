import { Injectable } from '@angular/core';
import { ClBodega } from '../../model/ClBodega';

// Importamos  las librerías necesarias
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

// creamos Constantes que utilizaremos en el envio
const apiUrl = "http://localhost:3000/bodega";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
 
@Injectable({
  providedIn: 'root'
})
export class BodegaService {
  constructor(private http: HttpClient) { }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("handleError Harrys", error); // log to console instead
      return of(result as T);
    };
  }
  addBodega(bodega: ClBodega): Observable<ClBodega> {
    console.log("Res-api Enviando addCategoria : ", bodega);
    return this.http.post<ClBodega>(apiUrl, bodega, httpOptions)
      .pipe(
        tap((bodega: ClBodega) => console.log('added bodega w/:', bodega)),
        catchError(this.handleError<ClBodega>('addBodega'))
      );
  }
  getBodegas(): Observable<ClBodega[]> {
    console.log("getCategorias ()");
    return this.http.get<ClBodega[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched bodegas')),
        catchError(this.handleError('getBodegas', []))
      );
  }

  getBodega(id: String): Observable<ClBodega> {
    console.log("getBodega ID:" + id);
    return this.http.get<ClBodega>(apiUrl + "/" + id)
      .pipe(
        tap(_ => console.log('fetched bodega id=${id}')),
        catchError(this.handleError<ClBodega>('getBodega id=${id}'))
      );
  }

  deleteBodega(id: number): Observable<ClBodega> {
    return this.http.delete<ClBodega>(apiUrl + "/" + id, httpOptions)
      .pipe(
        tap(_ => console.log('deleted bodega id=${id}')),
        catchError(this.handleError<ClBodega>('deleteBodega'))
      );
  }
  updateBodega(id: number, bodega: ClBodega): Observable<ClBodega> {
    return this.http.put<ClBodega>(apiUrl + "/" + id, bodega, httpOptions)
      .pipe(
        tap(_ => console.log('updated bodega id=${id}')),
        catchError(this.handleError<any>('updateBodega'))
      );
  }


}
