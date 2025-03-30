import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component'
import { ChatComponent } from "../chat/chat.component";
import { VisualCodeComponent } from "../visual-code/visual-code.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, ChatComponent, VisualCodeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
