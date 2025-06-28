import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../footer/footer.component';
import { CarritoListComponent } from "./components/carrito-list/carrito-list.component";

@Component({
  selector: 'app-carrito',
  imports: [HeaderComponent, FooterComponent, CarritoListComponent],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {

}
