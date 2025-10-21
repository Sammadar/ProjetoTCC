// src/app/layout/footer/footer.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `<footer class="app-footer">© {{year}} CuraSystem</footer>`,
  styles: [`.app-footer{padding:.75rem;text-align:center;border-top:1px solid rgba(0,0,0,0.04);background:var(--surface-card)}`]
})
export class FooterComponent {
  year = new Date().getFullYear();
}
