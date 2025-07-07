import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto/producto.service';
import { Producto } from '../models/producto';
import { CurrencyPipe } from '@angular/common';
import { FooterComponent } from "../../../../public/footer/footer.component";
import { HeaderComponent } from "../../../../public/header/header.component";


@Component({
  selector: 'app-ver-detalle-producto',
  imports: [CurrencyPipe, FooterComponent, HeaderComponent],
  templateUrl: './ver-detalle-producto.component.html',
  styleUrl: './ver-detalle-producto.component.css'
})
export class VerDetalleProductoComponent implements OnInit {


    producto!: Producto;
  productos: Producto[] = [];
  constructor(private productoService: ProductoService, private router: ActivatedRoute) {

  }

ngOnInit(): void {
const id = this.router?.snapshot.paramMap.get('id');//Capturo el id en el momento que se carga el componente
if(id){
  this.productoService.irAVerDetalleProducto(Number(id)).subscribe({
    
    next: (data)=> this.producto = data,
        error: (error) => {
        console.error('Error al obtener el producto:', error);
      }
  })
}
console.log(this.producto);
}
  agregarAlCarrito(arg0: number) {
throw new Error('Method not implemented.');
}


}
