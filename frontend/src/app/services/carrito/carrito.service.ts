import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Producto } from '../../pages/models/producto';
import { Carrito } from '../../pages/carrito/interfaces/carrito.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  constructor() {}
  private apiUrl = 'http://localhost:3000/api/usuario';
  http = inject(HttpClient);

  agregarProductoAlCarrito(producto: Producto) {
    let headers = new HttpHeaders();

    headers = headers.append('Authorization', 'Bearer ' + this.getToken());

    return this.http.post(`${this.apiUrl}/agregar-al-carrito`, producto, {
      headers,
    });
  }

  obtenerCarrito(): Observable<Carrito> {
    const token = this.getToken();
    if (!token) {
      return new Observable<Carrito>();
    }

    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer ' + token
    );
    return this.http.get<Carrito>(`${this.apiUrl}/carrito`, { headers });
  }

  getToken(): string {
    if (typeof window !== 'undefined') {
      console.log(localStorage.getItem('token'));
      return localStorage.getItem('token') || '';
    }
    return '';
  }

  vaciarCarrito() {
    const token = this.getToken();
    if (!token) {
      return;
    }
    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer ' + token
    );
    this.http.delete(`${this.apiUrl}/carrito`, { headers }).subscribe();
  }

  eliminarProductoDelCarrito(id: number) {
    const token = this.getToken();
    if (!token) {
      return;
    }
    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer ' + token
    );
    this.http.delete(`${this.apiUrl}/carrito/${id}`, { headers }).subscribe();
  }
}
