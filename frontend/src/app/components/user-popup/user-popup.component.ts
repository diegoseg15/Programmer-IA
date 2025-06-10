import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@Component({
  selector: 'app-user-popup',
  standalone: true,
  imports: [RouterLink, MatIconModule, CommonModule, ClickOutsideDirective ],
  templateUrl: './user-popup.component.html',
  styleUrl: './user-popup.component.css'
})
export class UserPopupComponent {
  isOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  togglePopup(): void {
    this.isOpen = !this.isOpen;
    console.log('Popup toggled:', this.isOpen);
  }

  closePopup() {
    this.isOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.closePopup();
    this.router.navigate(['/login']);
  }

  // Método para verificar si el usuario está autenticado
  get isAuthenticated(): boolean {
    return this.authService.isLoggedIn();
  }

  // Método para obtener el email del usuario (podrías almacenarlo al hacer login)
  get userEmail(): string {
    // Esto es un ejemplo - deberías obtener el email del token o de donde lo hayas almacenado
    return localStorage.getItem('userEmail') || 'Usuario';
  }
}