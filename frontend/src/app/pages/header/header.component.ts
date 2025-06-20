import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Input } from '@angular/core';
@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Input() transparente: boolean = false;
}
