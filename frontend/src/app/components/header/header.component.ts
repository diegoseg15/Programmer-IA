import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { UserPopupComponent } from '../user-popup/user-popup.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [UserPopupComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userData: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.userData$.subscribe(data => {
      this.userData = data;
    });
  }
}