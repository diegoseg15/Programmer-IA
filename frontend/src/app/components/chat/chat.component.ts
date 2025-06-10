import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from '../../compartido/message';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-chat',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  @Output() chatSubmit = new EventEmitter<{
    modelo: string;
    mensaje: string;
  }>();
  @Input() messages: Message[] = [];
  @Input() parsedResponse: any = null; // ✅ Ahora recibimos parsedResponse

  chatForm!: FormGroup;
  modelos: string[] = ['gpt-3', 'gpt-4', 'gpt-4o', 'deepseek-chat'];
  error: string = '';

  constructor(private fb: FormBuilder) {
    this.crearFormulario();
  }

  crearFormulario() {
    this.chatForm = this.fb.group({
      modelo: ['', Validators.required],
      mensaje: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    if (this.chatForm.invalid) {
      this.error = 'Por favor completa los campos correctamente.';
      return;
    }

    this.error = '';

    const formData = {
      modelo: this.chatForm.value.modelo,
      mensaje: this.chatForm.value.mensaje,
    };

    // Emitir datos al padre
    this.chatSubmit.emit(formData);

    // Añadir mensaje del usuario al chat localmente
    this.messages.push({
      role: 'user',
      content: this.chatForm.value.mensaje,
    });

    // Limpiar campo de mensaje
    const mensajeCtrl = this.chatForm.get('mensaje');
    if (mensajeCtrl instanceof FormControl) {
      mensajeCtrl.reset();
    }
  }

  // Este método lo puedes usar desde el padre para agregar respuesta del assistant
  agregarRespuesta(respuesta: string) {
    this.messages.push({
      role: 'assistant',
      content: respuesta,
    });
  }

  parsearMensaje(content: string): string {
    try {
      const json = JSON.parse(
        content
          .replace(/```json/gi, '')
          .replace(/```/g, '')
          .replace(/\\n/g, '')
          .trim()
      );
      console.log(content);

      return json.mensaje || content; // Si no tiene mensaje, devuelve el contenido bruto
    } catch {
      return content; // Si falla el parseo, muestra el contenido tal cual
    }
  }
}
