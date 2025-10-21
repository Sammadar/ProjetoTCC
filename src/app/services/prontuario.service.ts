import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Paciente {
  id: number;
  nome: string;
  idade: number;
  sexo: string;
  contato: string;
  historico: string;
}

export interface Consulta {
  data: string;
  motivo: string;
  diagnostico: string;
}

export interface Exame {
  tipo: string;
  data: string;
  resultado: string;
}

export interface Prescricao {
  medicamento: string;
  dosagem: string;
  observacoes: string;
}

@Injectable({ providedIn: 'root' })
export class ProntuarioService {
  private paciente: Paciente | null = null;
  private consultas: Consulta[] = [];
  private exames: Exame[] = [];
  private prescricoes: Prescricao[] = [];

  paciente$ = new BehaviorSubject<Paciente | null>(this.paciente);
  consultas$ = new BehaviorSubject<Consulta[]>(this.consultas);
  exames$ = new BehaviorSubject<Exame[]>(this.exames);
  prescricoes$ = new BehaviorSubject<Prescricao[]>(this.prescricoes);

  salvarPaciente(p: Paciente) {
    this.paciente = p;
    this.paciente$.next(p);
  }

  adicionarConsulta(c: Consulta) {
    this.consultas.push(c);
    this.consultas$.next(this.consultas);
  }

  adicionarExame(e: Exame) {
    this.exames.push(e);
    this.exames$.next(this.exames);
  }

  adicionarPrescricao(p: Prescricao) {
    this.prescricoes.push(p);
    this.prescricoes$.next(this.prescricoes);
  }
}
