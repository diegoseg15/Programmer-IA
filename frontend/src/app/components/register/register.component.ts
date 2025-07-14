import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  names: String = '';
  lastnames: String = '';
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    if (!this.names || !this.lastnames || !this.email || !this.password || !this.repeatPassword) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    if (this.password !== this.repeatPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Correo inválido.';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    const userRegister: any = {
      names: this.names.trim(),
      lastnames: this.lastnames.trim(),
      email: this.email.trim(),
      password: this.password
    };

    this.authService.register(userRegister).subscribe({
      next: (response) => {
        if (response.message === 'Usuario registrado correctamente') {
          this.successMessage = 'Registro exitoso. Redirigiendo...';
          this.errorMessage = '';
          setTimeout(() => this.router.navigate(['/login']), 1500);
        } else {
          this.errorMessage = 'No se pudo registrar.';
          this.successMessage = '';
        }
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Usuario ya existente';
        this.successMessage = '';
        console.error('Error en registro:', err);
      }
    });
  }

}
