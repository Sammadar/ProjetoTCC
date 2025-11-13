import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="subnav" role="navigation" aria-label="Menu principal">
      <a routerLink="/dashboard" routerLinkActive="active" class="subnav-item">Dashboard</a>
      <a routerLink="/agendamentos" routerLinkActive="active" class="subnav-item">Agendamentos</a>
      <a routerLink="/lista-pacientes" routerLinkActive="active" class="subnav-item">Pacientes</a>
    </nav>
  `,
  styles: [`
    .subnav {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: .45rem 1rem;
      background: var(--surface-card);
      border-bottom: 1px solid rgba(0,0,0,0.04);
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;

      /* sticky imediatamente abaixo do topbar.
         Ajuste top conforme a altura real do seu topbar (ex.: 56px). */
      position: sticky;
      top: var(--topbar-height, 56px);
      z-index: 1050;
    }

    .subnav-item {
      padding: .45rem .85rem;
      border-radius: 8px;
      text-decoration: none;
      color: var(--text-color);
      font-weight: 500;
    }
    .subnav-item:hover { background: rgba(0,0,0,0.04); }
    .subnav-item.active { background: var(--primary-color); color: #fff; }
  `]
})
export class AppNavbar {}
