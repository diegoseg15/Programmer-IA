import { Component, Input, AfterViewChecked, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

//Imports de prism
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';

// declare var Prism: any;

@Component({
  selector: 'app-visual-code',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visual-code.component.html',
  styleUrls: ['./visual-code.component.css']
})
export class VisualCodeComponent implements AfterViewChecked {
  @Input() codeData: string = '';
  @Input() language: string = 'javascript';
  @Input() analysis: string = '';

  constructor(private elRef: ElementRef) {}

  ngAfterViewChecked(): void {
    this.highlightCode();
  }

  private highlightCode(): void {
    const codeElement = this.elRef.nativeElement.querySelector('.code-body pre code');
    if (codeElement) {
      codeElement.className = `language-${this.language.toLowerCase()}`;
      Prism.highlightElement(codeElement);
    }
  }

  get languageClass(): string {
    return `language-${this.language.toLowerCase()}`;
  }
}