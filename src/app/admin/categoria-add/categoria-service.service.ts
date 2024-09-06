import { Injectable } from '@angular/core';
import { ClCategoria } from '../../model/ClCategoria';

// Importamos  las librerías necesarias
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

// creamos Constantes que utilizaremos en el envio
const apiUrl = "http://localhost:3000/categoria";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
 
@Injectable({
  providedIn: 'root'
})
export class CategoriaServiceService {
  constructor(private http: HttpClient) { }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("handleError Harrys", error); // log to console instead
      return of(result as T);
    };
  }
  addCategoria(categoria: ClCategoria): Observable<ClCategoria> {
    console.log("Res-api Enviando addCategoria : ", categoria);
    return this.http.post<ClCategoria>(apiUrl, categoria, httpOptions)
      .pipe(
        tap((categoria: ClCategoria) => console.log('added categoria w/:', categoria)),
        catchError(this.handleError<ClCategoria>('addCategoria'))
      );
  }
  getCategorias(): Observable<ClCategoria[]> {
    console.log("getCategorias ()");
    return this.http.get<ClCategoria[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched products')),
        catchError(this.handleError('getCategorias', []))
      );
  }

  getCategoria(id: String): Observable<ClCategoria> {
    console.log("getCategoria ID:" + id);
    return this.http.get<ClCategoria>(apiUrl + "/" + id)
      .pipe(
        tap(_ => console.log('fetched categoria id=${id}')),
        catchError(this.handleError<ClCategoria>('getCategoria id=${id}'))
      );
  }

  deleteCategoria(id: number): Observable<ClCategoria> {
    return this.http.delete<ClCategoria>(apiUrl + "/" + id, httpOptions)
      .pipe(
        tap(_ => console.log('deleted categoria id=${id}')),
        catchError(this.handleError<ClCategoria>('deleteCategoria'))
      );
  }
  updateCategoria(id: number, categoria: ClCategoria): Observable<ClCategoria> {
    return this.http.put<ClCategoria>(apiUrl + "/" + id, categoria, httpOptions)
      .pipe(
        tap(_ => console.log('updated categoria id=${id}')),
        catchError(this.handleError<any>('updateCategoria'))
      );
  }


}
