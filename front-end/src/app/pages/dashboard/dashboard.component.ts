import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Estatisticas {
  totalPacientes: number;
  consultasHoje: number;
  consultasMes: number;
  taxaOcupacao: number;
  receitaMes: number;
}

interface ConsultaRecente {
  id: number;
  paciente: string;
  horario: string;
  tipo: string;
  status: string;
  medico: string;
}

interface PacienteRecente {
  id: number;
  nome: string;
  ultimaConsulta: string;
  proximaConsulta: string;
  status: string;
}

interface Metricas {
  label: string;
  value: number;
  variation: number;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ChartModule,
    TableModule,
    ButtonModule,
    TagModule,
    ProgressBarModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Estatísticas principais
  estatisticas: Estatisticas = {
    totalPacientes: 1247,
    consultasHoje: 23,
    consultasMes: 287,
    taxaOcupacao: 78,
    receitaMes: 85420
  };

  // Métricas do dashboard
  metricas: Metricas[] = [
    {
      label: 'Pacientes Ativos',
      value: 847,
      variation: 12,
      icon: 'pi pi-users',
      color: 'bg-blue-500'
    },
    {
      label: 'Consultas Hoje',
      value: 23,
      variation: 5,
      icon: 'pi pi-calendar',
      color: 'bg-green-500'
    },
    {
      label: 'Taxa de Ocupação',
      value: 78,
      variation: 8,
      icon: 'pi pi-chart-bar',
      color: 'bg-orange-500'
    },
  ];

  // Consultas recentes
  consultasRecentes: ConsultaRecente[] = [
    { id: 1, paciente: 'João Silva', horario: '09:00', tipo: 'Consulta de Rotina', status: 'Confirmada', medico: 'Dr. Carlos Santos' },
    { id: 2, paciente: 'Maria Santos', horario: '10:30', tipo: 'Exame', status: 'Confirmada', medico: 'Dra. Ana Oliveira' },
    { id: 3, paciente: 'Pedro Costa', horario: '14:00', tipo: 'Consulta Emergencial', status: 'Pendente', medico: 'Dr. Carlos Santos' },
    { id: 4, paciente: 'Ana Pereira', horario: '15:30', tipo: 'Retorno', status: 'Confirmada', medico: 'Dra. Ana Oliveira' },
    { id: 5, paciente: 'Carlos Lima', horario: '16:45', tipo: 'Acompanhamento', status: 'Cancelada', medico: 'Dr. Roberto Silva' }
  ];

  // Pacientes recentes
  pacientesRecentes: PacienteRecente[] = [
    { id: 1, nome: 'João Silva', ultimaConsulta: '15/01/2024', proximaConsulta: '20/01/2024', status: 'Ativo' },
    { id: 2, nome: 'Maria Santos', ultimaConsulta: '14/01/2024', proximaConsulta: '28/01/2024', status: 'Ativo' },
    { id: 3, nome: 'Pedro Costa', ultimaConsulta: '10/01/2024', proximaConsulta: '25/01/2024', status: 'Ativo' },
    { id: 4, nome: 'Ana Pereira', ultimaConsulta: '12/01/2024', proximaConsulta: '02/02/2024', status: 'Inativo' },
    { id: 5, nome: 'Carlos Lima', ultimaConsulta: '08/01/2024', proximaConsulta: '15/02/2024', status: 'Ativo' }
  ];
  router: any;

//Botao novo paciente

  // novoPaciente() {
  //   console.log('Novo paciente');
  //   this.router.navigate(['cadastro-paciente']);
  // }

  // Gráficos
  consultasChart: any;
  pacientesChart: any;
  ocupacaoChart: any;

  // Data para filtro
  dataFiltro: Date = new Date();

  ngOnInit() {
    this.inicializarGraficos();
  }

  inicializarGraficos() {
    // Gráfico de Consultas por Mês
    this.consultasChart = {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      datasets: [
        {
          label: 'Consultas Realizadas',
          data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 75, 80, 90],
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.4
        },
        {
          label: 'Consultas Agendadas',
          data: [28, 48, 40, 19, 86, 27, 90, 60, 50, 65, 70, 85],
          fill: false,
          borderColor: '#FFA726',
          tension: 0.4
        }
      ]
    };

    // Gráfico de Distribuição de Pacientes
    this.pacientesChart = {
      labels: ['Cardiologia', 'Pediatria', 'Ortopedia', 'Dermatologia', 'Clínico Geral'],
      datasets: [
        {
          data: [300, 150, 200, 120, 400],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF'
          ]
        }
      ]
    };

    // Gráfico de Ocupação por Dia da Semana
    this.ocupacaoChart = {
      labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      datasets: [
        {
          label: 'Taxa de Ocupação (%)',
          data: [65, 75, 80, 85, 90, 45],
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          borderWidth: 1
        }
      ]
    };
  }

  getSeverity(status: string) {
    switch (status) {
      case 'Confirmada':
        return 'success';
      case 'Pendente':
        return 'warn';
      case 'Cancelada':
        return 'danger';
      case 'Ativo':
        return 'success';
      case 'Inativo':
        return 'danger';
      default:
        return 'info';
    }
  }

  formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }

  calcularVariacao(valorAtual: number, valorAnterior: number): number {
    return ((valorAtual - valorAnterior) / valorAnterior) * 100;
  }

  // Método para obter valor absoluto (substitui Math.abs)
  getValorAbsoluto(valor: number): number {
    return valor < 0 ? -valor : valor;
  }

  // Opções dos gráficos
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };

  barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };
}