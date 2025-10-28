import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'primeng/tabs';
import { DatePickerModule } from 'primeng/datepicker';


interface Pacientes {
  id: number;
  name: string;
  age: number;
  gender: string;
  emergencyContact: string;
  bloodType: string;
  allergies: string[];
}

interface MedicalRecord {
  date: Date;
  diagnosis: string;
  treatment: string;
  doctor: string;
}

interface Exam {
  id: number;
  name: string;
  date: Date;
  result: string;
  status: string;
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate: Date;
}

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    TableModule, 
    ButtonModule, 
    DialogModule, 
    InputTextModule,
    TextareaModule,
    DatePickerModule,
    CardModule,
    TagModule,
    ToggleButtonModule,
    TabsModule,
  ],
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent {
  // Dados do paciente selecionado
  selectedPatient: Pacientes = {
    id: 1,
    name: 'João Silva',
    age: 45,
    gender: 'Masculino',
    emergencyContact: '(11) 99999-9999 - Maria Silva',
    bloodType: 'O+',
    allergies: ['Penicilina', 'Amendoim']
  };

  // Modo emergência
  emergencyMode: boolean = false;

  // Histórico Familiar
  familyHistory = [
    { relation: 'Pai', condition: 'Hipertensão', age: 70 },
    { relation: 'Mãe', condition: 'Diabetes', age: 65 },
    { relation: 'Avô Paterno', condition: 'Cardiopatia', age: 75 }
  ];

  // Antecedentes Clínicos
  clinicalHistory = [
    { condition: 'Hipertensão', diagnosisDate: new Date('2018-03-15'), status: 'Controlada' },
    { condition: 'Diabetes Tipo 2', diagnosisDate: new Date('2020-07-20'), status: 'Controlada' },
    { condition: 'Asma', diagnosisDate: new Date('2015-11-10'), status: 'Inativa' }
  ];

  // Exames
  exams: Exam[] = [
    { id: 1, name: 'Hemograma Completo', date: new Date('2024-01-15'), result: 'Normal', status: 'Concluído' },
    { id: 2, name: 'Glicemia', date: new Date('2024-01-15'), result: '98 mg/dL', status: 'Concluído' },
    { id: 3, name: 'Raio-X Torax', date: new Date('2024-02-01'), result: 'Pendente', status: 'Agendado' }
  ];

  // Prontuário
  medicalRecords: MedicalRecord[] = [
    { date: new Date('2024-01-15'), diagnosis: 'Consulta de rotina', treatment: 'Acompanhamento', doctor: 'Dr. Carlos Santos' },
    { date: new Date('2023-11-20'), diagnosis: 'Hipertensão controlada', treatment: 'Manter medicação', doctor: 'Dr. Carlos Santos' },
    { date: new Date('2023-08-10'), diagnosis: 'Resfriado comum', treatment: 'Repouso e hidratação', doctor: 'Dra. Ana Oliveira' }
  ];

  // Medicamentos
  medications: Medication[] = [
    { name: 'Losartana', dosage: '50mg', frequency: '1x ao dia', startDate: new Date('2023-01-01'), endDate: new Date('2024-12-31') },
    { name: 'Metformina', dosage: '850mg', frequency: '2x ao dia', startDate: new Date('2023-01-01'), endDate: new Date('2024-12-31') },
    { name: 'AAS', dosage: '100mg', frequency: '1x ao dia', startDate: new Date('2023-06-01'), endDate: new Date('2024-12-31') }
  ];

  // Dialog states
  visible: boolean = false;
  newFamilyMember: any = {};
  newClinicalHistory: any = {};
  newExam: any = {};
  newMedication: any = {};
  newMedicalRecord: any = {};

  toggleEmergencyMode() {
    this.emergencyMode = !this.emergencyMode;
    if (this.emergencyMode) {
      // Aqui você pode adicionar lógica para modo emergência
      console.log('MODO EMERGÊNCIA ATIVADO');
    }
  }

  showDialog(dialogType: string) {
    this.visible = true;
    // Lógica para diferentes tipos de diálogo pode ser adicionada aqui
  }

  getSeverity(status: string) {
    switch (status) {
      case 'Concluído':
        return 'success';
      case 'Agendado':
        return 'warn';
      case 'Cancelado':
        return 'danger';
      default:
        return 'info';
    }
  }
}