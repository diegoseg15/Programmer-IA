import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { UserLogin } from '../../compartido/userlogin';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const userLogin: UserLogin = {
      email: this.email,
      password: this.password
    };

    this.authService.login(userLogin).subscribe({
      next: (response) => {
        // Asumiendo que el backend devuelve el token en response.token
        if (response.token) {
          localStorage.setItem('token', response.token); // Guardar el token
          this.router.navigate(['/']); // Redirigir a página principal
        }
      },
      error: (err) => {
        this.errorMessage = 'Credenciales incorrectas';
        this.successMessage = '';
        console.error('Error en login:', err);
      }
    });
  }
}