import { Routes } from '@angular/router';

export default [

    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
    { path: 'agendamentos', loadComponent: () => import('./agendamentos/agendamentos.component').then(m => m.AgendamentosComponent) },
    { path: 'configuracoes', loadComponent: () => import('./configuracoes/configuracoes.component').then(m => m.ConfiguracoesComponent) },
    {path: 'pacientes', loadComponent: () => import('./pacientes/pacientes.component').then(m => m.PacientesComponent)  },
] as Routes;
