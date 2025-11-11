import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DatePicker } from 'primeng/datepicker';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { TabsClasses } from 'primeng/tabs';
import { TabsModule } from 'primeng/tabs';
import { TextareaModule } from 'primeng/textarea';


interface Agendamento {
  id: number;
  patientName: string;
  patientId: number;
  date: Date;
  time: string;
  type: string;
  status: string;
  doctor: string;
  notes: string;
}

interface Schedule {
  date: Date;
  agendamentos: Agendamento[];
}

interface Patient {
  id: number;
  name: string;
  phone: string;
  email: string;
  lastAppointment: Date;
  nextAppointment: Date | null;
}

@Component({
  selector: 'app-agendamentos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    TextareaModule,
    DatePicker,
    CardModule,
    TagModule,
    SelectModule,
    TabsModule,
  ],
  templateUrl: './agendamentos.component.html',
  styleUrl: './agendamentos.component.scss'
})
export class AgendamentosComponent {
  // Dados para Agenda
  schedules: Schedule[] = [
    {
      date: new Date('2024-01-20'),
      agendamentos: [
        { id: 1, patientName: 'João Silva', patientId: 1, date: new Date('2024-01-20'), time: '09:00', type: 'Consulta de Rotina', status: 'Confirmado', doctor: 'Dr. Carlos Santos', notes: 'Retorno hipertensão' },
        { id: 2, patientName: 'Maria Santos', patientId: 2, date: new Date('2024-01-20'), time: '10:30', type: 'Exame', status: 'Confirmado', doctor: 'Dra. Ana Oliveira', notes: 'Coleta de sangue' }
      ]
    },
    {
      date: new Date('2024-01-21'),
      agendamentos: [
        { id: 3, patientName: 'Pedro Costa', patientId: 3, date: new Date('2024-01-21'), time: '14:00', type: 'Consulta Emergencial', status: 'Pendente', doctor: 'Dr. Carlos Santos', notes: 'Dor abdominal' }
      ]
    }
  ];

  // Dados para Consultas
  agendamentos: Agendamento[] = [
    { id: 1, patientName: 'João Silva', patientId: 1, date: new Date('2024-01-20'), time: '09:00', type: 'Consulta de Rotina', status: 'Confirmado', doctor: 'Dr. Carlos Santos', notes: 'Retorno hipertensão' },
    { id: 2, patientName: 'Maria Santos', patientId: 2, date: new Date('2024-01-20'), time: '10:30', type: 'Exame', status: 'Confirmado', doctor: 'Dra. Ana Oliveira', notes: 'Coleta de sangue' },
    { id: 3, patientName: 'Pedro Costa', patientId: 3, date: new Date('2024-01-21'), time: '14:00', type: 'Consulta Emergencial', status: 'Pendente', doctor: 'Dr. Carlos Santos', notes: 'Dor abdominal' },
    { id: 4, patientName: 'Ana Pereira', patientId: 4, date: new Date('2024-01-22'), time: '11:00', type: 'Acompanhamento', status: 'Cancelado', doctor: 'Dra. Ana Oliveira', notes: 'Paciente remarcou' }
  ];

  // Dados para Pacientes
  patients: Patient[] = [
    { id: 1, name: 'João Silva', phone: '(11) 99999-9999', email: 'joao@email.com', lastAppointment: new Date('2024-01-10'), nextAppointment: new Date('2024-01-20') },
    { id: 2, name: 'Maria Santos', phone: '(11) 88888-8888', email: 'maria@email.com', lastAppointment: new Date('2024-01-15'), nextAppointment: new Date('2024-01-20') },
    { id: 3, name: 'Pedro Costa', phone: '(11) 77777-7777', email: 'pedro@email.com', lastAppointment: new Date('2023-12-20'), nextAppointment: new Date('2024-01-21') },
    { id: 4, name: 'Ana Pereira', phone: '(11) 66666-6666', email: 'ana@email.com', lastAppointment: new Date('2024-01-05'), nextAppointment: null }
  ];

  // Dialog states
  visible: boolean = false;
  dialogType: string = '';


  newAgendamento = {
    date: new Date(),
    time: '',
    type: '',
    patientId: undefined as number | undefined,
    doctor: '',
    notes: ''
  };

  // Filtros - CORRIGIDO
  statusFilter: string = '';
  dateFilter: Date | undefined = undefined;
  doctorFilter: string = '';

  // Opções para selects
  appointmentTypes = [
    { label: 'Consulta de Rotina', value: 'Consulta de Rotina' },
    { label: 'Consulta Emergencial', value: 'Consulta Emergencial' },
    { label: 'Exame', value: 'Exame' },
    { label: 'Acompanhamento', value: 'Acompanhamento' },
    { label: 'Retorno', value: 'Retorno' }
  ];

  statusOptions = [
    { label: 'Confirmado', value: 'Confirmado' },
    { label: 'Pendente', value: 'Pendente' },
    { label: 'Cancelado', value: 'Cancelado' },
    { label: 'Concluído', value: 'Concluído' }
  ];

  doctors = [
    { label: 'Dr. Carlos Santos', value: 'Dr. Carlos Santos' },
    { label: 'Dra. Ana Oliveira', value: 'Dra. Ana Oliveira' },
    { label: 'Dr. Roberto Lima', value: 'Dr. Roberto Lima' }
  ];


  getSeverity(status: string) {
    switch (status) {
      case 'Confirmado':
        return 'success';
      case 'Pendente':
        return 'warn';
      case 'Cancelado':
        return 'danger';
      case 'Concluído':
        return 'info';
      default:
        return 'secondary';
    }
  }

  showDialog(type: string) {
    this.dialogType = type;
    this.visible = true;

    if (type === 'newAgendamento') {
      this.newAgendamento = {
        date: new Date(),
        time: '',
        type: '',
        patientId: undefined,
        doctor: '',
        notes: ''
      };
    }
  }

  saveAgendamento() {
    console.log('Salvar agendamento:', this.newAgendamento);
    this.visible = false;
  }

  getFilteredAgendamentos() {
    let filtered = this.agendamentos;

    if (this.statusFilter) {
      filtered = filtered.filter(agenda => agenda.status === this.statusFilter);
    }

    if (this.dateFilter) {
      filtered = filtered.filter(agenda =>
        agenda.date.toDateString() === this.dateFilter!.toDateString()
      );
    }

    if (this.doctorFilter) {
      filtered = filtered.filter(agenda => agenda.doctor === this.doctorFilter);
    }

    return filtered;
  }
}