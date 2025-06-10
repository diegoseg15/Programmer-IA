import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ChatComponent } from '../chat/chat.component';
import { VisualCodeComponent } from '../visual-code/visual-code.component';

import { Prompt } from '../../compartido/prompt';
import { Message } from '../../compartido/message';
import { AIChatsService } from '../../service/ai-chats.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    HeaderComponent,
    FooterComponent,
    ChatComponent,
    VisualCodeComponent,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  prompt = new Prompt();
  messages: Message[] = [];
  parsedResponse: any = null; // ✅ Agregado

  constructor(private AIChatsService: AIChatsService) {}

  onChatSubmit(formData: { modelo: string; mensaje: string }) {
    const userMessage = new Message();
    userMessage.role = 'user';
    userMessage.content = formData.mensaje;

    const systemMessage = new Message();
    systemMessage.role = 'developer';
    systemMessage.content = `Analiza el siguiente fragmento de código y actúa como un sistema experto en revisión de buenas prácticas, estilo clean code, advertencias sobre uso de librerías obsoletas o ineficientes, y responde exclusivamente en el siguiente formato JSON: '''json\n{lenguaje:'', code:'', mensaje:''}\n'''`;

    this.prompt.model = formData.modelo;
    this.prompt.messages = [systemMessage, userMessage];

    this.AIChatsService.chatModels(this.prompt).subscribe({
      next: (response) => {
        const assistantMessage = new Message();
        assistantMessage.role = 'assistant';
        assistantMessage.content =
          response.choices?.[0]?.message?.content || 'Sin respuesta';

        this.messages.push(assistantMessage);

        const cleanContent = assistantMessage.content.trim();

        try {
          const parsed = JSON.parse(
            cleanContent
              .replace(/```json\n/gi, '')
              .replace(/\n```/g, '')
              .replace(/'''json\n/gi, '')
              .replace(/\n'''/g, '')
              .replace(/```json/gi, '')
              .replace(/```/g, '')
          );
          this.parsedResponse = parsed; // ✅ Aquí lo guardas
          console.log('Parsed response:', this.parsedResponse);
        } catch (error) {
          console.error('Error parsing assistant response:', error);
        }
      },
      error: (err) => {
        console.error('Error en OpenAI:', err);
      },
    });
  }
}
