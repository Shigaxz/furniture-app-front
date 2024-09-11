import { Injectable } from '@angular/core';
import { ClCategoria } from '../../model/ClCategoria';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const apiUrl =
  'https://forniture-api.netlify.app/.netlify/functions/server/api/categorias';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class CategoriaServiceService {
  constructor(private http: HttpClient) {}
  addCategoria(categoria: ClCategoria): Observable<ClCategoria> {
    console.log('Res-api Enviando addCategoria : ', categoria);
    return this.http.post<ClCategoria>(apiUrl, categoria, httpOptions);
  }
  getCategorias(): Observable<ClCategoria[]> {
    console.log('getCategorias ()');
    return this.http.get<ClCategoria[]>(apiUrl);
  }

  getCategoria(id: String): Observable<ClCategoria> {
    console.log('getCategoria ID:' + id);
    return this.http.get<ClCategoria>(apiUrl + '/' + id);
  }

  deleteCategoria(id: number): Observable<ClCategoria> {
    return this.http.delete<ClCategoria>(apiUrl + '/' + id, httpOptions);
  }
  updateCategoria(id: number, categoria: ClCategoria): Observable<ClCategoria> {
    return this.http.put<ClCategoria>(
      apiUrl + '/' + id,
      categoria,
      httpOptions
    );
  }
}
