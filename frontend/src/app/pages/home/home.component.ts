import { Component } from '@angular/core';
import {RouterOutlet } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from '../header/header.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, FooterComponent,HeaderComponent, ToastModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

}
