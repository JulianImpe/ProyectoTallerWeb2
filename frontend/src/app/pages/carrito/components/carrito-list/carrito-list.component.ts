import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CarritoService } from '../../../../services/carrito/carrito.service';
import { Observable } from 'rxjs';
import { Carrito } from '../../interfaces/carrito.interface';
import { ProgressSpinner } from 'primeng/progressspinner';
import { ItemCarrito } from '../../interfaces/item-carrito.interface';

@Component({
  selector: 'app-carrito-list',
  imports: [ProgressSpinner],
  templateUrl: './carrito-list.component.html',
  styleUrl: './carrito-list.component.css',
})
export class CarritoListComponent implements OnInit, OnDestroy {
  constructor() {}

  carritoService = inject(CarritoService);
  messageService = inject(MessageService);
  carrito!: Observable<Carrito>;
  productos!: ItemCarrito[];
  total: number = 0;

  spinner: boolean = true;

  ngOnInit() {
    this.carrito = this.carritoService.obtenerCarrito();
    this.carrito.subscribe({
      next: (data) => {
        this.spinner = false;
        this.productos = data.items;
        this.total = data.items.reduce(
          (total, item) => total + item.precio * item.cantidad,
          0
        );
      },
    });
  }

  eliminarProducto(id: number) {
    this.carritoService.eliminarProductoDelCarrito(id);
    this.carrito.subscribe({
      next: (data) => {
        this.productos = data.items;
        this.total = data.items.reduce(
          (total, item) => total + item.precio * item.cantidad,
          0
        );
      },
    });
    this.carrito = this.carritoService.obtenerCarrito();
  }

  vaciarCarrito() {
    this.carritoService.vaciarCarrito();
    this.carrito.subscribe({
      next: (data) => {
        this.productos = data.items;
        this.total = data.items.reduce(
          (total, item) => total + item.precio * item.cantidad,
          0
        );
      },
    });
    this.carrito = this.carritoService.obtenerCarrito();
  }

  ngOnDestroy() {}
}
