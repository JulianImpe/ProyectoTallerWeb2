import { Producto } from './../models/producto';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto/producto.service';

import { TipoProducto } from '../../../enums/app.enums';
import { CurrencyPipe } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { UserService } from '../../services/user.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CarritoService } from '../../services/carrito/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  imports: [CurrencyPipe, FooterComponent, HeaderComponent, ToastModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  tipoProductos = Object.values(TipoProducto);
  router = inject(Router);
  usuarioService = inject(UserService);
  messageService = inject(MessageService);
  carritoService = inject(CarritoService);

  // Me trae todos los valores del enum TipoProducto
  //tipoProducto: TipoProducto = TipoProducto.CAFE_EN_GRANOS; // Le pongo un valor por defecto
  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data; //Le decimos al obtener productos que se compare con la data para reemplazar su valor.
      },
      error: (error) => {
        console.error('Error al obtener los productos:', error);
      },
    });
  }

  obtenerProductosPorTipoProducto(tipoProducto: string) {
  this.productoService
    .obtenerProductosPorTipoProducto(tipoProducto as TipoProducto)
    .subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (error) => {
        console.error('Error al obtener los productos por tipo:', error);
      },
    });
}

  irAVerDetalleProducto(id: number) {
    this.router.navigate(['/ver-detalle-producto', id]);
  }
  agregarProducto(producto: Producto) {
    if (this.usuarioService.verificarSesion()) {
      let response = this.carritoService.agregarProductoAlCarrito(producto);
      response.subscribe({
        next: (data) => {
          console.log('Producto agregado al carrito:', data);
          this.messageService.add({
            severity: 'success',
            summary: 'Agregado',
            detail: `${producto.nombre} agregado al carrito`,
          });
        },
        error: (error) => {
          console.error('Error al agregar producto al carrito:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `No se pudo agregar ${producto.nombre}  al carrito.`,
          });
        },
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debes iniciar sesión para agregar productos al carrito.',
      });
    }
  }
}
