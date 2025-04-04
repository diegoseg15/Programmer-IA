import { Component } from '@angular/core';
import { UserPopupComponent } from "../user-popup/user-popup.component";

@Component({
  selector: 'app-header',
  imports: [UserPopupComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
