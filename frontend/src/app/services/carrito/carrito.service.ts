import { Injectable } from '@angular/core';
import { ProductoCarrito } from '../../pages/carrito/interfaces/producto-carrito.interface';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor() { }

  getCarrito(): ProductoCarrito[]{
    return JSON.parse(localStorage.getItem('carrito') || '[]');
  }

  agregarProducto(producto:ProductoCarrito):void{
    let carrito = this.getCarrito();
    let productoExiste = carrito.find(item => item.id === producto.id);
    if(productoExiste){
      productoExiste.cantidad += producto.cantidad;
    }else{
      carrito.push(producto);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  eliminarProducto(id:number):void{
    let carrito = this.getCarrito();
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  limpiarCarrito():void{
    localStorage.removeItem('carrito');
  }
}
