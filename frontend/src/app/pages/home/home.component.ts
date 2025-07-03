import { Component } from '@angular/core';
import {RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../../../public/footer/footer.component";
import { HeaderComponent } from '../../../../public/header/header.component';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, FooterComponent,HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

}
