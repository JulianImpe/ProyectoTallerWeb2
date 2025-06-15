import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto/producto.service';
import { Producto } from '../models/producto';

@Component({
  selector: 'app-productos',
  imports: [],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})

export class ProductosComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService){
    
  }

  ngOnInit(): void {
      this.productoService.obtenerProductos().subscribe({
        next:(data) =>{
          this.productos = data;//Le decimos al obtener productos que se compare con la data para reemplazar su valor.
        },
        error:(error) =>{
          console.error('Error al obtener los productos:', error);
        }
      }
      );
  }


}
