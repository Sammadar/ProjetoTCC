// src/app/layout/header/header.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonModule, AvatarModule, TooltipModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  darkMode = false;

  @Output() darkModeChange = new EventEmitter<boolean>();

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    this.darkModeChange.emit(this.darkMode);
    document.body.classList.toggle('dark-mode', this.darkMode);
  }
}
