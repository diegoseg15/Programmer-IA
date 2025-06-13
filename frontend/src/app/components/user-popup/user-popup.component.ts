import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@Component({
  selector: 'app-user-popup',
  changeDetection: ChangeDetectionStrategy.OnPush, // <-- Agrega esto
  standalone: true,
  imports: [RouterLink, MatIconModule, CommonModule, ClickOutsideDirective],
  templateUrl: './user-popup.component.html',
  styleUrl: './user-popup.component.css'
})
export class UserPopupComponent {
  @Input() user: any = null;

  isOpen: boolean = false;
  isAuthenticated: boolean | undefined;
  userName: string | undefined;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.isAuthenticated = this.authService.isLoggedIn();
    this.updateUserName();
  }

  ngOnChanges() {
    this.updateUserName();
  }

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

  private updateUserName() {
    this.userName = this.user?.message.names ? this.user?.message.names + " " + this.user?.message.lastnames : this.user?.email ? this.user?.email : "Usuario";

  }
}