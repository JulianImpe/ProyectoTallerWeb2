import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../src/app/services/user.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  router = inject(Router);
  userService = inject(UserService);
  @Input() transparente: boolean = false;
  ngOnInit() {
  }
  irHacia(ruta:string) {
    this.router.navigate([ruta]);
  }
}


