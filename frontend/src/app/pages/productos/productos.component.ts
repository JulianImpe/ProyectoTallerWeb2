import { Producto } from './../models/producto';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto/producto.service';

import { TipoProducto } from '../../../enums/app.enums';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-productos',
  imports: [CurrencyPipe],

  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})

export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  tipoProductos = Object.values(TipoProducto);
  router = inject(Router);
   // Me trae todos los valores del enum TipoProducto
  //tipoProducto: TipoProducto = TipoProducto.CAFE_EN_GRANOS; // Le pongo un valor por defecto
  constructor(private productoService: ProductoService) {

  }


  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data;//Le decimos al obtener productos que se compare con la data para reemplazar su valor.
      
      },
      error: (error) => {
        console.error('Error al obtener los productos:', error);
      }
    }
    );
  }

  obtenerProductosPorTipoProducto(tipoProducto: TipoProducto): Producto[] {
 // Actualiza el tipo de producto seleccionado

    this.productoService.obtenerProductosPorTipoProducto(tipoProducto).subscribe({
      next: (data) => {
        this.productos = data; // Actualiza la lista de productos filtrados por tipo
      },
      error: (error) => {
        console.error('Error al obtener los productos por tipo:', error);
      }
    }
    );
    return this.productos; 
  }

  irAVerDetalleProducto(id: number) {
    this.router.navigate(['/ver-detalle-producto', id]);
  }

}
