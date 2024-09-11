import { Injectable } from '@angular/core';
import { ClBodega } from '../../model/ClBodega';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const apiUrl =
  'https://forniture-api.netlify.app/.netlify/functions/server/api/bodegas';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class BodegaService {
  constructor(private http: HttpClient) {}
  addBodega(bodega: ClBodega): Observable<ClBodega> {
    console.log('Res-api Enviando addCategoria : ', bodega);
    return this.http.post<ClBodega>(apiUrl, bodega, httpOptions);
  }
  getBodegas(): Observable<ClBodega[]> {
    console.log('getCategorias ()');
    return this.http.get<ClBodega[]>(apiUrl);
  }

  getBodega(id: String): Observable<ClBodega> {
    console.log('getBodega ID:' + id);
    return this.http.get<ClBodega>(apiUrl + '/' + id);
  }

  deleteBodega(id: number): Observable<ClBodega> {
    return this.http.delete<ClBodega>(apiUrl + '/' + id, httpOptions);
  }
  updateBodega(id: number, bodega: ClBodega): Observable<ClBodega> {
    return this.http.put<ClBodega>(apiUrl + '/' + id, bodega, httpOptions);
  }
}
