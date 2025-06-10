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
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'; // <-- Añade esto


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
  @Input() isLoading: boolean = false;
  @Input() messages: Message[] = [];
  @Input() parsedResponse: any = null;

  chatForm!: FormGroup;
  modelos: string[] = ['gpt-4o', 'gpt-3.5-turbo', 'gpt-3.5', 'deepseek-chat'];
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.crearFormulario();
    marked.use({ async: false });
    this.configureMarked();

  }

  private configureMarked(): void {
    marked.setOptions({
      gfm: true,
      breaks: true,
      silent: true // Evita advertencias en consola
    });
  }

  crearFormulario() {
    this.chatForm = this.fb.group({
      modelo: ['', Validators.required],
      mensaje: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    if (this.chatForm.invalid) {
      this.error = '⚠️ Por favor completa los campos correctamente.';
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
    // this.messages.push({
    //   role: 'user',
    //   content: this.chatForm.value.mensaje,
    // });

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

  parseMarkdown(text: string): SafeHtml {
    try {
      if (!text) return '';
      const parsed = marked(text) as string;
      return this.sanitizer.bypassSecurityTrustHtml(parsed);
    } catch (error) {
      return this.sanitizer.bypassSecurityTrustHtml(text);
    }
  }

}
