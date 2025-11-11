import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { DialogModule } from 'primeng/dialog';
import { PacientesComponent } from '../detalhe-paciente/pacientes.component';

@Component({
  selector: 'app-lista-pacientes',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    InputTextModule,
    CardModule,
    FormsModule,
    RouterLink,
    DialogModule,
    PacientesComponent,

  ],
  templateUrl: './lista-pacientes.html',
  styleUrl: './lista-pacientes.scss'
})
export class ListaPacientes {
  filtro: string = '';

  pacientes = [
    { nome: 'João Silva', cpf: '123.456.789-00', idade: 45, sexo: 'Masculino', tipoSanguineo: 'O+' },
    { nome: 'Maria Souza', cpf: '987.654.321-00', idade: 33, sexo: 'Feminino', tipoSanguineo: 'A-' },
    { nome: 'Carlos Pereira', cpf: '111.222.333-44', idade: 60, sexo: 'Masculino', tipoSanguineo: 'B+' }
  ];
  visible: boolean = false;

  pacientesFiltrados = [...this.pacientes];
  router: any;

  filtrarPacientes() {
    const filtroLower = this.filtro.toLowerCase();
    this.pacientesFiltrados = this.pacientes.filter(
      (p) =>
        p.nome.toLowerCase().includes(filtroLower) ||
        p.cpf.toLowerCase().includes(filtroLower)
    );
  }

  novoPaciente() {
    console.log('Novo paciente');
    this.router.navigate(['cadastro-paciente']);
  }

  abrirProntuario(paciente:any) {
    console.log('Abrir prontuário');
    this.visible = true;
  }

  excluirPaciente(paciente: any) {
    console.log('Excluir paciente:', paciente);



  }
}
