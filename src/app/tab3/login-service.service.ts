import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClUsuario } from '../model/ClUsuario';

const apiUrl = "https://forniture-api.netlify.app/.netlify/functions/server/api/usuarios";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  public sesion = false;
  public usuario: ClUsuario = {
    id: 0
    , username: ''
    , password: ''
    , avatar: ''
    , role: 0
  };

  public apiUrl = 'https://forniture-api.netlify.app/.netlify/functions/server/api/usuarios';

  constructor(
    private http: HttpClient,
    private navControl: NavController
  ) { }
  getUsuarios(): Observable<ClUsuario[]> {
    console.log("getUsuarios ()");
    return this.http.get<ClUsuario[]>(apiUrl);
  }
  addUsuario(usuario: ClUsuario): Observable<ClUsuario> {
    console.log("Res-api Enviando AddUsuario : ", usuario);
    return this.http.post<ClUsuario>(apiUrl, usuario, httpOptions);
  }

  verificarCredenciales(usuario: any, password: any): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/verificarCredenciales`, usuario);
  }
  verificarRol(rolRequired: number, rolUser: number, sesion: boolean) {
    if (sesion) {
      if (rolRequired !== rolUser) {
        this.navControl.navigateRoot('');
      }
    } else {
      this.navControl.navigateRoot('');
    }
  }
}
