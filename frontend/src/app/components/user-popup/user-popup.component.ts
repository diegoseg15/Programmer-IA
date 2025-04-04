import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-user-popup',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './user-popup.component.html',
  styleUrl: './user-popup.component.css'
})
export class UserPopupComponent {
  isOpen: boolean = false;

  togglePopup(): void {
    this.isOpen = !this.isOpen;
    console.log('Popup toggled:', this.isOpen);
  }

  closePopup() {
    this.isOpen = false;
  }
}
