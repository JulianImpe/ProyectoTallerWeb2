import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import{UserService, User} from '../../services/user.service';

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
usuarios: User[] = [];
mostrar:boolean = true;

constructor(private userService: UserService){}
  ngOnInit():void{
    this.userService.getUsers().subscribe(data=>{
      this.usuarios = data;
    })
  }
  toggleMostrar():void{
    this.mostrar = !this.mostrar;
  }
}
