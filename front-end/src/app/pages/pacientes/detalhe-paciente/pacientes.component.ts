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
import { FileUploadModule } from 'primeng/fileupload';
import { BrowserModule } from '@angular/platform-browser';
import { NovoPaciente } from '@/models/paciente';
import { PacientesService } from '../../service/pacientes.service';

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
  fileUrl?: string; // caminho do arquivo (base64)
  fileName?: string; // nome do arquivo
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
    FileUploadModule,
  ],
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent {
toggleFullscreen() {
throw new Error('Method not implemented.');
}
isFullscreen: any;
downloadExam(arg0: Exam) {
throw new Error('Method not implemented.');
}
  novoPaciente: any;
  tipoSanguineo: any;
  nomeNumeroEmergencia: any;

  constructor(private pacientesService: PacientesService) {}

  paciente: NovoPaciente = {
    nome: "",
    tipoSanguineo: "",
    contatoEmergencia: "",
    contatoEmergenciaNumero: "",
  }

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
    { condition: 'Asma', diagnosisDate: new Date('2015-11-10'), status: 'Em tratamento' }
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
  showExamDialog: boolean = false;
  selectedExam: Exam | null = null;

  newFamilyMember: any = {};
  newClinicalHistory: any = {};
  newExam: any = {};
  newMedication: any = {};
  newMedicalRecord: any = {};

  toggleEmergencyMode() {
    this.emergencyMode = !this.emergencyMode;
    if (this.emergencyMode) {
      console.log('MODO EMERGÊNCIA ATIVADO');
    }
  }

  showDialog(dialogType: string) {
    this.visible = true;
  }

  // Função de upload do exame
  onUpload(event: any, exam: Exam) {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        exam.fileUrl = e.target.result;
        exam.fileName = file.name;
        exam.status = 'Concluído';
        exam.result = 'Arquivo anexado';
      };
      reader.readAsDataURL(file);
    }
  }

  // Visualizar exame
  viewExam(exam: Exam) {
    if (!exam.fileUrl) {
      alert('Nenhum arquivo foi anexado a este exame.');
      return;
    }
    this.selectedExam = exam;
    this.showExamDialog = true;
  }

  getSeverity(status: string) {
    switch (status) {
      case 'Controlada':
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

  cadastrar() {
    this.pacientesService.cadastrar(this.paciente).subscribe({
      next: aluno => alert("deu boa!"),
      error: erro => console.log("Ocorreu um erro ao cadastrar o aluno:" + erro),
    });
  }
}
