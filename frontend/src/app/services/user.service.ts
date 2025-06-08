import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    { id: 1, nombre: 'Juli', apellido: 'Imperiale', email: 'juli@gmail.com' },
    { id: 2, nombre: 'Juan', apellido: 'Perez', email: 'jua@gmail.com' },
    { id: 3, nombre: 'Ana', apellido: 'Gomez', email: 'ana@gmail.com' }
  ]
  constructor() { }
  getUsers(): Observable<User[]> {
    return of(this.users);
  }
}
