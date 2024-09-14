import { Injectable } from '@angular/core';

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


  addDetalle(Detalle_ven: any): Observable<any> {
    return this.http.post<any>(apiUrl, Detalle_ven, httpOptions).pipe(
      catchError((error) => {
        console.error('Error al hacer el POST:', error);
        return throwError(() => new Error(error));
      })
    );
  }
  
  getDetalles(): Observable<any[]> {
    return this.http.get<any[]>(apiUrl);
  }

  getdetalle(id: String): Observable<any> {
    return this.http.get<any>(apiUrl + '/' + id);
  }
}
