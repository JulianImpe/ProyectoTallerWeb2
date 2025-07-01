import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CredencialesLogin, UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor() {}

  form!: FormGroup;

  private fb = inject(FormBuilder);

  messageService = inject(MessageService);
  usuarioService = inject(UserService);

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required, Validators.email],
      contraseña: ['', Validators.required],
    });
  }

  iniciarSesion() {
    if (!this.form.valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Formulario no válido',
      });
      return;
    }

    const credenciales: CredencialesLogin = {
      email: this.form.value.username,
      contraseña: this.form.value.password,
    };

    this.usuarioService.iniciarSesion(credenciales).subscribe({
      next: (response) => {
        console.log('Inicio de sesión exitoso', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Bienvenido',
          detail: 'Sesión iniciada correctamente',
        });
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Credenciales incorrectas',
        });
      },
    });
  }
}
