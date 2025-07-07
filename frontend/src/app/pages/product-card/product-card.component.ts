import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Producto } from '../models/producto';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  router = inject(Router);
@Input() producto!: Producto; //Le digo aca que el padre me envie el producto
@Output() irAVerDetalleProductoEvent = new EventEmitter<number>();
ngOnInit() {
}
  irAVerDetalleProducto(id: number) {
    this.router.navigate(['/ver-detalle-producto', id]);
  }
}
