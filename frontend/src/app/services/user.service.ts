import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { UsuarioRegistro } from '../pages/signup/interfaces/usuario-registro.interface';

export interface CredencialesLogin {
  email: string;
  contraseña: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _url = 'http://localhost:3000/api/usuario';

  http = inject(HttpClient);
  constructor() {}
  iniciarSesion(credenciales: CredencialesLogin) {
    return this.http.post(`${this._url}/login`, credenciales).pipe(
      map((response) => {
        return response;
      })
    );
  }

  registrar(usuario : UsuarioRegistro){
    return this.http.post(`${this._url}`, usuario).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
