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
      <a routerLink="/lista-pacientes" routerLinkActive="active" class="subnav-item">Lista de Pacientes</a>
      <a routerLink="/configuracoes" routerLinkActive="active" class="subnav-item">Configurações</a>
    </nav>
  `,
  styles: [`
    :host { display: block; z-index: 1000; }

    .app-header {
      width: 100%;
      background: var(--surface-card);
      border-bottom: 1px solid rgba(0,0,0,0.06);
      position: sticky;
      top: 0;
      box-shadow: 0 1px 0 rgba(0,0,0,0.04);
    }

    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: .6rem 1rem;
      gap: .75rem;
    }

    .brand .title {
      font-weight: 700;
      font-size: 1.2rem;
      color: var(--text-color);
      font-family: 'Days One', sans-serif;
    }

    .subnav {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 1.5rem;
      padding: .6rem 1rem;
      background: var(--surface-ground);
      border-bottom: 1px solid rgba(0,0,0,0.05);
      overflow-x: auto;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
    }

    .subnav-item {
      padding: .5rem .9rem;
      border-radius: 8px;
      text-decoration: none;
      color: var(--text-color);
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .subnav-item:hover {
      background: rgba(0,0,0,0.05);
    }

    .subnav-item.active {
      background: var(--primary-color);
      color: #fff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    }

    @media (max-width: 720px) {
      .subnav {
        gap: .5rem;
        padding: .4rem .5rem;
      }
      .subnav-item {
        font-size: 0.85rem;
        padding: .4rem .6rem;
      }
    }
  `]
})
export class AppNavbar {}
