import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


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
  @Input() messages: any[] = [];

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  chatForm!: FormGroup;
  modelos: string[] = ['gpt-4o', 'o4-mini', 'o3-mini', 'gpt-3.5-turbo', 'deepseek-chat', 'gemini-2.0-flash'];
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
      silent: true
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

    this.chatSubmit.emit(formData);

    const mensajeCtrl = this.chatForm.get('mensaje');
    if (mensajeCtrl instanceof FormControl) {
      mensajeCtrl.reset();
    }
  }

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['messages']) {
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  private scrollToBottom(): void {
    try {
      const el = this.scrollContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }

}
