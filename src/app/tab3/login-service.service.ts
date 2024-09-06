import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ClUsuario } from '../model/ClUsuario';
// creamos Constantes que utilizaremos en el envio
const apiUrl = "http://localhost:3000/usuario";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  public apiUrl = 'http://localhost:3000/usuario';

  constructor(private http: HttpClient) { }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("handleError Harrys", error); // log to console instead
      return of(result as T);
    };
  }
  getUsuarios(): Observable<ClUsuario[]> {
    console.log("getUsuarios ()");
    return this.http.get<ClUsuario[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched users')),
        catchError(this.handleError('getUsuarios', []))
      );
  }
  addUsuario(usuario: ClUsuario): Observable<ClUsuario> {
    console.log("Res-api Enviando AddUsuario : ", usuario);
    return this.http.post<ClUsuario>(apiUrl, usuario, httpOptions)
      .pipe(
        tap((usuario: ClUsuario) => console.log('added usuario w/:', usuario)),
        catchError(this.handleError<ClUsuario>('addUsuario'))
      );
  }

  verificarCredenciales(usuario: any, password: any): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/verificarCredenciales`, usuario);
  }
}
