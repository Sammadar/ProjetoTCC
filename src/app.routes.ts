// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LayoutComponent } from './app/layout/layout/layout.component';


export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./app/pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'agendamentos', loadComponent: () => import('./app/pages/agendamentos/agendamentos.component').then(m => m.AgendamentosComponent) },
      { path: 'configuracoes', loadComponent: () => import('./app/pages/configuracoes/configuracoes.component').then(m => m.ConfiguracoesComponent) },
      {path: 'pacientes', loadComponent: () => import('./app/pages/pacientes/pacientes.component').then(m => m.PacientesComponent)  }
    ]
  },
   { path: '**', redirectTo: 'dashboard' }
];
