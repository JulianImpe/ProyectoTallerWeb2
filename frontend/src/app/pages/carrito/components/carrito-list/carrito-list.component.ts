import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CarritoService } from '../../../../services/carrito/carrito.service';
import { ProductoCarrito } from '../../interfaces/producto-carrito.interface';

@Component({
  selector: 'app-carrito-list',
  imports: [],
templateUrl: './carrito-list.component.html',
  styleUrl: './carrito-list.component.css'
})
export class CarritoListComponent implements  OnInit, OnDestroy{
  constructor(){
  }

  carritoService = inject(CarritoService);
  messageService = inject(MessageService);

  spinner:boolean = true;

  carrito: ProductoCarrito[] = [];

  ngOnInit(){
    this.carrito = this.carritoService.getCarrito();
  }

  ngOnDestroy(){
  }
}
