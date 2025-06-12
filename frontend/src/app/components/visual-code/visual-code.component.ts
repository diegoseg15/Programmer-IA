import { Component, Input, AfterViewChecked, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

//Imports de prism
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';

@Component({
  selector: 'app-visual-code',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './visual-code.component.html',
  styleUrls: ['./visual-code.component.css']
})
export class VisualCodeComponent implements AfterViewChecked, OnInit {
  @Input() isLoading: boolean = false;
  @Input() messages: any[] = [];

  selectedIndex: number = 0;
  codeData: string = '';
  language: string = 'Code';
  analysis: string = '';

  constructor(
    private elRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (this.messages.length > 0) {
      this.setMessageData(this.selectedIndex);
    }
  }

  ngOnChanges() {
    if (this.messages && this.messages.length > 0) {
      this.selectedIndex = this.messages.length - 1
      this.setMessageData(this.selectedIndex);
    }
  }

  ngAfterViewChecked(): void {
    this.highlightCode();
  }

  onSelectChange(): void {
    this.setMessageData(this.selectedIndex);
    console.log("codeData: ", this.codeData);

  }

  private setMessageData(index: number): void {
    const selected = this.messages[index];
    if (!selected) return;
    this.codeData = (selected.code || '').replace(/\\n/g, '\n');

    this.codeData = selected.code || '';
    this.language = selected.lenguaje || 'text';
    this.analysis = selected.mensaje || '';

    this.cdr.detectChanges();
    this.highlightCode();
  }

  highlightCode(): void {
    setTimeout(() => {
      const codeElement = this.elRef.nativeElement.querySelector('.code-body pre code');
      if (codeElement) {
        codeElement.className = `language-${this.language.toLowerCase()}`;
        Prism.highlightElement(codeElement);
      }
    }, 0);
  }


  get languageClass(): string {
    return `language-${this.language.toLowerCase()}`;
  }
}