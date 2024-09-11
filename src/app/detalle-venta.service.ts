import { Injectable } from '@angular/core';
import { ClDetalleV } from './model/ClDetalleV';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const apiUrl = "https://forniture-api.netlify.app/.netlify/functions/server/api/detalle-ventas";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
@Injectable({
  providedIn: 'root',
})
export class DetalleServiceService {
  constructor(private http: HttpClient) {}


  addDetalle(Detalle_ven: ClDetalleV): Observable<ClDetalleV> {
    console.log('Datos a enviar:', Detalle_ven);
    return this.http.post<ClDetalleV>(apiUrl, Detalle_ven, httpOptions).pipe(
      catchError((error) => {
        console.error('Error al hacer el POST:', error);
        return throwError(() => new Error(error));
      })
    );
  }
  
  getDetalles(): Observable<ClDetalleV[]> {
    console.log('getProducts ()');
    return this.http.get<ClDetalleV[]>(apiUrl);
  }

  getdetalle(id: String): Observable<ClDetalleV> {
    console.log('getProduct ID:' + id);
    return this.http.get<ClDetalleV>(apiUrl + '/' + id);
  }
}
