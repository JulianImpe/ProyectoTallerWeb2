import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { UsuarioRegistro } from '../pages/signup/interfaces/usuario-registro.interface';
import { CredencialesLogin } from '../pages/login/interfaces/credenciales-login.interface';
import { RecuperarContrasena } from './../pages/recuperar-contrasena/interfaces/recuperar-contrasena.interface';



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

  registrar(usuario: UsuarioRegistro) {
    return this.http.post(`${this._url}`, usuario).pipe(
      map((response) => {
        return response;
      })
    );
  }

  verificarSesion(): boolean {
    const token = localStorage.getItem('token');
    const response = this.http.post(`${this._url}/validar-token`, { token });

    const data = response.pipe(
      map((response) => {
        return response;
      })
    );

    return data ? true : false;
  }

  recuperarContrasena(credenciales: RecuperarContrasena) {
    return this.http.post(`${this._url}/actualizar`, credenciales).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
