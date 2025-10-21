import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

interface Clinica {
  nome: string;
  cnpj: string;
  telefone: string;
  email: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
}

interface Notificacoes {
  emailConsultas: boolean;
  emailExames: boolean;
  smsLembretes: boolean;
  pushNotifications: boolean;
  lembreteAntecedencia: number;
}

interface Seguranca {
  autenticacaoDoisFatores: boolean;
  tempoSessao: number;
  complexidadeSenha: boolean;
  backupAutomatico: boolean;
}

@Component({
  selector: 'app-configuracoes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    InputTextModule,
    ButtonModule,
    SelectModule,
    CheckboxModule,
    ToggleButtonModule,
    DividerModule,
    TabViewModule,
    ToastModule
  ],
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss'],
  providers: [MessageService]
})
export class ConfiguracoesComponent {
  // Dados da Clínica
  clinica: Clinica = {
    nome: 'CuraSystem Clínica',
    cnpj: '12.345.678/0001-90',
    telefone: '(11) 99999-9999',
    email: 'contato@curasystem.com',
    endereco: 'Rua das Flores, 123',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01234-567'
  };

  // Configurações de Notificações
  notificacoes: Notificacoes = {
    emailConsultas: true,
    emailExames: true,
    smsLembretes: false,
    pushNotifications: true,
    lembreteAntecedencia: 24
  };

  // Configurações de Segurança
  seguranca: Seguranca = {
    autenticacaoDoisFatores: true,
    tempoSessao: 60,
    complexidadeSenha: true,
    backupAutomatico: true
  };

  // Configurações do Sistema
  sistema = {
    tema: 'claro',
    idioma: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    formatoData: 'dd/MM/yyyy',
    formatoHora: '24h'
  };

  // Backup
  backup = {
    frequencia: 'diario',
    ultimoBackup: new Date('2024-01-15'),
    proximoBackup: new Date('2024-01-16'),
    localArmazenamento: 'nuvem'
  };

  // Opções para selects
  temas = [
    { label: 'Claro', value: 'claro' },
    { label: 'Escuro', value: 'escuro' },
    { label: 'Automático', value: 'auto' }
  ];

  idiomas = [
    { label: 'Português (BR)', value: 'pt-BR' },
    { label: 'Inglês', value: 'en' },
    { label: 'Espanhol', value: 'es' }
  ];

  timezones = [
    { label: 'Brasília (UTC-3)', value: 'America/Sao_Paulo' },
    { label: 'Manaus (UTC-4)', value: 'America/Manaus' },
    { label: 'Acre (UTC-5)', value: 'America/Rio_Branco' }
  ];

  formatosData = [
    { label: 'DD/MM/AAAA', value: 'dd/MM/yyyy' },
    { label: 'MM/DD/AAAA', value: 'MM/dd/yyyy' },
    { label: 'AAAA-MM-DD', value: 'yyyy-MM-dd' }
  ];

  formatosHora = [
    { label: '24 horas', value: '24h' },
    { label: '12 horas', value: '12h' }
  ];

  frequenciasBackup = [
    { label: 'Diário', value: 'diario' },
    { label: 'Semanal', value: 'semanal' },
    { label: 'Mensal', value: 'mensal' }
  ];

  locaisArmazenamento = [
    { label: 'Nuvem', value: 'nuvem' },
    { label: 'Local', value: 'local' },
    { label: 'Ambos', value: 'ambos' }
  ];

  antecedencias = [
    { label: '1 hora', value: 1 },
    { label: '6 horas', value: 6 },
    { label: '12 horas', value: 12 },
    { label: '24 horas', value: 24 },
    { label: '48 horas', value: 48 }
  ];

  temposSessao = [
    { label: '15 minutos', value: 15 },
    { label: '30 minutos', value: 30 },
    { label: '1 hora', value: 60 },
    { label: '4 horas', value: 240 },
    { label: '8 horas', value: 480 }
  ];

  constructor(private messageService: MessageService) {}

  salvarConfiguracoes() {
    // Simular salvamento
    console.log('Configurações salvas:', {
      clinica: this.clinica,
      notificacoes: this.notificacoes,
      seguranca: this.seguranca,
      sistema: this.sistema,
      backup: this.backup
    });

    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Configurações salvas com sucesso!'
    });
  }

  executarBackup() {
    // Simular backup
    this.messageService.add({
      severity: 'info',
      summary: 'Backup',
      detail: 'Backup em andamento...'
    });

    setTimeout(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Backup Concluído',
        detail: 'Backup realizado com sucesso!'
      });
      this.backup.ultimoBackup = new Date();
    }, 2000);
  }

  restaurarPadroes() {
    // Restaurar configurações padrão
    this.notificacoes = {
      emailConsultas: true,
      emailExames: true,
      smsLembretes: false,
      pushNotifications: true,
      lembreteAntecedencia: 24
    };

    this.seguranca = {
      autenticacaoDoisFatores: true,
      tempoSessao: 60,
      complexidadeSenha: true,
      backupAutomatico: true
    };

    this.messageService.add({
      severity: 'info',
      summary: 'Configurações Restauradas',
      detail: 'Configurações padrão restauradas com sucesso!'
    });
  }

  exportarDados() {
    this.messageService.add({
      severity: 'info',
      summary: 'Exportação',
      detail: 'Exportando dados do sistema...'
    });
  }

  limparCache() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Cache Limpo',
      detail: 'Cache do sistema limpo com sucesso!'
    });
  }
}