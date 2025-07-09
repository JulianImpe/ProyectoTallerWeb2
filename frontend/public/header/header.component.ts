import { Component, inject, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  router = inject(Router);
  @Input() transparente: boolean = false;

  estaLogueado: boolean = false;

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.estaLogueado = !!localStorage.getItem('token');
    }
  }

  irHacia(ruta: string) {
    this.router.navigate([ruta]);
  }

  cerrarSesion() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      this.estaLogueado = false;
    }
  }
}
