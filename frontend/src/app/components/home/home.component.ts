import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ChatComponent } from '../chat/chat.component';
import { VisualCodeComponent } from '../visual-code/visual-code.component';

import { Prompt } from '../../compartido/prompt';
import { Message } from '../../compartido/message';
import { AIChatsService } from '../../service/ai-chats.service';
import { CommonModule } from '@angular/common';
import { PromptSave } from '../../compartido/promptSave';

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
  promptSave = new PromptSave();
  messages: Message[] = [];
  parsedResponse: any = null;
  isLoading: boolean = false; // ✅ Nuevo: para estado de carga

  constructor(private AIChatsService: AIChatsService) { }

  onChatSubmit(formData: { modelo: string; mensaje: string }) {
    this.isLoading = true; // ✅ Activar carga

    const userMessage = new Message();
    userMessage.role = 'user';
    userMessage.content = formData.mensaje;
    this.messages.push(userMessage); // ✅ Mostrar mensaje usuario inmediatamente

    const systemMessage = new Message();
    systemMessage.role = 'system';
    systemMessage.content = `Eres un sistema experto en revisión de código. Dado un fragmento de código fuente en cualquier lenguaje, analiza su calidad y responde exclusivamente en este formato JSON, asegurándote de que el campo 'lenguaje' sea correcto y estandarizado (por ejemplo: "C++", "Java", "Python"): '''json\n{"lenguaje": "C++", "code": "<código original>", "mensaje": "<análisis técnico sobre buenas prácticas, estilo clean code y uso de librerías modernas; usa un tono profesional, evita repeticiones y no incluyas explicaciones fuera del JSON> y escrito en formato Markdown"}\n'''.`;


    this.prompt.model = formData.modelo;
    this.prompt.messages = [systemMessage, userMessage];

    console.log(this.prompt);
    

    this.AIChatsService.chatModels(this.prompt).subscribe({
      next: (response) => {
        const assistantMessage = new Message();
        assistantMessage.role = 'assistant';
        assistantMessage.content = response.choices?.[0]?.message?.content || 'Sin respuesta';
        this.messages.push(assistantMessage);

        try {
          this.parsedResponse = this.parseAssistantResponse(assistantMessage.content);
        } catch (error) {
          console.error('Error parsing response:', error);
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.isLoading = false;
      }
    });
  }

  private parseAssistantResponse(raw: string): any | null {
    try {
      console.log("sin parcear: ", raw);

      // 1. Eliminar delimitadores como '''json o ```json y triples comillas finales
      let cleaned = raw.trim()
        .replace(/^('''json|```json|```|''')/, '')
        .replace(/('''|```)\s*$/, '');

      // 2. Reemplazar comillas simples por comillas dobles (solo si no son internas)
      cleaned = cleaned.replace(/([{,])\s*'([^']+?)'\s*:/g, '$1"$2":') // claves
        .replace(/:\s*'([^']*?)'/g, ':"$1"');             // valores

      // 3. Intentar parsear como JSON
      console.log("parceado: ", cleaned);

      return JSON.parse(cleaned);
    } catch (err) {
      console.error('Error al parsear la respuesta del asistente:', err);
      return raw;
    }
  }

}