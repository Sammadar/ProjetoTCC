import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-cadastro-paciente',
  standalone: true,
  templateUrl: './cadastro-paciente.html',
  styleUrls: ['./cadastro-paciente.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    SelectModule,
    ButtonModule,
    ToastModule,
    NgxMaskDirective
  ],
  providers: [MessageService, provideNgxMask()]
})
export class CadastroPaciente {
  form: FormGroup;
  sexos = [
    { label: 'Masculino', value: 'M' },
    { label: 'Feminino', value: 'F' },
    { label: 'Outro', value: 'O' }
  ];

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      cpf: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      sexo: ['', Validators.required],
      idade: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      endereco: ['']
    });
  }

  somenteNumeros(event: any) {
    const valor = event.target.value.replace(/\D/g, '');
    event.target.value = valor;
    this.form.get('idade')?.setValue(valor);
  }

  onSubmit() {
    if (this.form.valid) {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Paciente cadastrado com sucesso!'
      });
      this.form.reset();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Preencha todos os campos obrigatórios.'
      });
      this.form.markAllAsTouched();
    }
  }
}
