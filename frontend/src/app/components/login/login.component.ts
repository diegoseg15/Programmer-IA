import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 👈 Importás FormsModule acá
import { RouterLink } from '@angular/router';

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

  onSubmit(): void {
    if (this.email === 'admin' && this.password === '1234') {
      this.successMessage = 'Login successful!';
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Invalid username or password';
      this.successMessage = '';
    }
  }
}
