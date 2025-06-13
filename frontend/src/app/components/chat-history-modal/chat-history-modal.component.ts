import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ChatsService } from '../../service/chats.service';
import { PromptSave } from '../../compartido/promptSave';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-history-modal',
  imports: [HeaderComponent, FooterComponent, RouterLink, MatIconModule, CommonModule],
  templateUrl: './chat-history-modal.component.html',
  styleUrl: './chat-history-modal.component.css'
})
export class ChatHistoryModalComponent {
  chats: any[] = [];

  constructor(private chatsService: ChatsService) { }

  ngOnInit() {
    this.chatsService.getAllChatsUser().subscribe({
      next: (data) => {
        this.chats = data.messages;
        console.log(this.chats);

      },
      error: (err) => {
        console.error('Error al obtener el chat', err);
      }
    });
  }

  onSubmitDelete(id: string | undefined) {
    if (!id) return;
    this.chatsService.deleteChat(id).subscribe({
      next: () => {
        location.reload();
      },
      error: (err) => {
        console.error('Error al obtener el chat', err);
      }
    })
  }
}
