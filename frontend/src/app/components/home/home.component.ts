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
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatsService } from '../../service/chats.service';

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
  isLoading: boolean = false;
  user: any;
  id: string | null = null;
  assistantResponses: any[] = [];
  selectedIndex: number = 0;
  parsedMessages: any[] = [];


  constructor(
    private AIChatsService: AIChatsService,
    private chatsService: ChatsService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.refreshUserData();

    this.getIdByURL()

    if (this.id !== null) {
      this.getActualChat(this.id)
    }

  }

  ngOnChanges() {
    this.getDataUser();
  }

  getDataUser() {
    this.userService.userData$.subscribe(data => {
      this.user = data.message;
    });
  }

  UpdateParcedMessages() {
    this.actualizarParsedMessages();
    this.assistantResponses = this.parsedMessages
      .filter(msg => msg.role === 'assistant')
      .map(msg => this.parseAssistantResponse(msg.content));
  }

  getActualChat(id: string) {
    this.chatsService.getChat(id).subscribe({
      next: (data) => {
        this.messages = data.messages; // aquí data debe ser un array de Message
        // console.log(this.messages);
        this.UpdateParcedMessages()

      },
      error: (err) => {
        console.error('Error al obtener el chat', err);
      }
    });
  }

  getIdByURL() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  onChatSubmit(formData: { modelo: string; mensaje: string }) {
    this.isLoading = true;
    this.getDataUser();

    const hasSystemMessage = this.messages.some(msg => msg.role === 'system');
    if (!hasSystemMessage) {
      const systemMessage = new Message();
      systemMessage.role = 'system';
      systemMessage.content = `Eres un sistema experto en revisión de código. Tu **ÚNICA** salida debe ser siempre un bloque **JSON VÁLIDO y COMPLETO**. **NO** incluyas texto o caracteres fuera de este bloque JSON. **ES CRÍTICO que los campos 'code' y 'mensaje' estén codificados en Base64 UTF-8.**

      El formato obligatorio es: \`\`\`json
      {\"lenguaje\": \"<nombre del lenguaje, ej: 'python', 'cpp', 'csharp', 'java'>\", \"code\": \"<código fuente original, corregido o con comentarios con explicación rápida del cambio, **ESTRICTAMENTE codificado en Base64 UTF-8**>\", \"mensaje\": \"<análisis técnico, recomendaciones de seguridad y mejoras. Este texto, que puede contener **caracteres especiales (como tildes, ñ)**, debe ser **ESTRICTAMENTE codificado en Base64 UTF-8**. Una vez decodificado, este contenido puede ser Markdown, incluyendo listas con viñetas estándar de Markdown (usando '-' o '*' seguido de un espacio).>\"}
      \`\`\`

      **EJEMPLO DE CÓDIGO Y MENSAJE EN BASE64 UTF-8 (el string "Hola mundo" codificado es "SG9sYSBtdW5kbw==" y "Código con tilde y ñ" es "Q29kaWdvIGNvbiB0aWxkZSB5IMfRLg=="):**
      \`\`\`json
      {
        "lenguaje": "javascript",
        "code": "Y29uc29sZS5sb2coJ0hvbGEgbXVuZG8nKTs=",
        "mensaje": "RXN0ZSBzZXJcdTAwYWEgZWwgYW7DoWxpcyBkZWwgY29kZ28gY29uIGNhcmFjdGVyZXMgZXNwZWNpYWxlcy4="
      }
      \`\`\`

      Tu respuesta comenzará y terminará exactamente con el bloque JSON, siguiendo **siempre** la estructura y la codificación Base64 requerida.`;
      // systemMessage.content = `Eres un sistema experto en revisión de código. Tu **ÚNICA** salida debe ser siempre un bloque **JSON VÁLIDO y COMPLETO**. **NO** incluyas texto o caracteres fuera de este bloque JSON. El formato obligatorio es: \`\`\`json {\"lenguaje\": \"<nombre del lenguaje, ej: 'python', 'cpp', 'csharp', 'java'>\", \"code\": \"<código fuente original, corregido o con comentarios con explicación rápida del cambio, **debe ser una cadena de texto codificada en Base64 VÁLIDA y COMPLETA**>\", \"mensaje\": \"<análisis técnico, recomendaciones de seguridad y mejoras. **Este texto DEBE contener caracteres especiales (como tildes, ñ) directamente, SIN usar secuencias de escape Unicode (ej. '\\u00e1'). Luego, este texto COMPLETO debe ser codificado en Base64 de forma VÁLIDA y SIN ERRORES**. Una vez decodificado, este contenido puede ser Markdown, incluyendo listas con viñetas estándar de Markdown (usando '-' o '*' seguido de un espacio).>\"} \`\`\`. Tu respuesta comenzará y terminará exactamente con este bloque JSON.`;
      this.messages.unshift(systemMessage);
    }

    const userMessage = new Message();
    userMessage.role = 'user';
    userMessage.content = formData.mensaje;

    this.messages.push(userMessage);

    this.UpdateParcedMessages()

    // datos para enviar a la ia
    this.prompt.model = formData.modelo;
    this.prompt.messages = this.messages;

    // datos para guardar
    this.promptSave.userId = this.user.id;
    this.promptSave.model = formData.modelo;
    this.promptSave.messages = this.prompt.messages;

    this.AIChatsService.chatModels(this.prompt).subscribe({
      next: (response) => {
        const assistantMessage = new Message();
        assistantMessage.role = 'assistant';
        assistantMessage.content = response.choices?.[0]?.message?.content || 'Sin respuesta';
        this.messages.push(assistantMessage);
        this.UpdateParcedMessages()

        try {
          if (this.id) {
            this.chatsService.updateChat(this.promptSave, this.id).subscribe({
              next: (res) => {
                console.log('Chat actualizado correctamente', res);
              },
              error: (err) => {
                console.error('Error al actualizar el chat:', err);
              }
            });
          } else {
            // console.log(this.user);
            this.chatsService.saveChat(this.promptSave).subscribe({
              next: (res) => {
                console.log('Chat guardado correctamente', res);
                this.router.navigate([`/chat/${res.id}`]);

              },
              error: (err) => {
                console.error('Error al guardar el chat:', err);
              }
            });
          }

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

  private actualizarParsedMessages(): void {
    console.log(this.messages);

    this.parsedMessages = this.messages.map(msg => {
      if (msg.role === 'assistant') {
        const parsed = this.parseAssistantResponse(msg.content);
        return {
          ...msg,
          parsedMensaje: parsed?.mensaje || msg.content
        };
      }
      return {
        ...msg,
        parsedMensaje: msg.content
      };
    });
  }

  private decodeBase64UTF8(base64String: string): string {
    try {
      const binaryString = atob(base64String); // Decodifica Base64 a una cadena binaria "Latin-1"
      const bytes = new Uint8Array(binaryString.length); // Crea un array de bytes
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i); // Rellena el array de bytes
      }
      return new TextDecoder('utf-8').decode(bytes); // Decodifica los bytes como UTF-8

    } catch (error) {
      console.error("Error en decodeBase64UTF8:", error);
      // Asegúrate de que la función lanza el error para que parseAssistantResponse pueda manejarlo
      throw error;
    }
  }


  parseAssistantResponse(raw: string) {
    console.log(raw);


    try {
      // Eliminar '''json o ```json
      let cleaned = raw.trim()
        .replace(/^('''json|```json|```|''')/, '')
        .replace(/('''|```)\s*$/, '');

      // Parsear como JSON
      const parsedJson = JSON.parse(cleaned);

      // Decodificar los campos 'code' y 'mensaje' de Base64 a UTF-8
      if (parsedJson.code) {
        try {
          parsedJson.code = this.decodeBase64UTF8(parsedJson.code);
        } catch (e) {
          console.warn("Error decodificando 'code' de Base64 UTF-8. Devolviendo el valor original.", e);
          parsedJson.code = ''
        }
      }

      if (parsedJson.mensaje) {
        try {
          parsedJson.mensaje = this.decodeBase64UTF8(parsedJson.mensaje);
        } catch (e) {
          console.warn("Error decodificando 'mensaje' de Base64 UTF-8. Devolviendo el valor original.", e);
          parsedJson.code === '' ? parsedJson.mensaje = 'Error de analisis, te recomiendo crear otro chat.' : parsedJson.mensaje = 'Analizando el código...';
        }
      }

      console.log(parsedJson);

      return parsedJson;
    } catch (err) {
      console.error('Error al parsear la respuesta del asistente:', err);
      return { mensaje: raw };
    }
  }

}