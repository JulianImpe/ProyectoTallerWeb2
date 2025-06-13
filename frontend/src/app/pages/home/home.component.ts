import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from 'express';
import { FooterComponent } from "../../public/footer/footer.component";
import { HeaderComponent } from '../../public/header/header.component';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, FooterComponent,HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

}
