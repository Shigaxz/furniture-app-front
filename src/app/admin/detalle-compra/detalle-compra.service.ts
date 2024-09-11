import { Injectable } from '@angular/core';
import { ClDetalleC } from '../../model/ClDetalleC';

import { Observable, of} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const apiUrl = "https://forniture-api.netlify.app/.netlify/functions/server/api/detalle-compras";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class DetalleCompraService {
  constructor(private http: HttpClient) { }
  addDetalleC(detalle: ClDetalleC): Observable<ClDetalleC> {
    console.log("Res-api Enviando addCategoria : ", detalle);
    return this.http.post<ClDetalleC>(apiUrl, detalle, httpOptions);
  }
  getDetalleCs(): Observable<ClDetalleC[]> {
    console.log("getCategorias ()");
    return this.http.get<ClDetalleC[]>(apiUrl);
  }
}
