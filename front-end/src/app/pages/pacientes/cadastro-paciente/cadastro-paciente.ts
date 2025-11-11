import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    MultiSelectModule,
    NgxMaskDirective,
    HttpClientModule
  ],
  providers: [MessageService, provideNgxMask()]
})
export class CadastroPaciente implements OnInit {
  form: FormGroup;
  sexos = [
    { label: 'Masculino', value: 'M' },
    { label: 'Feminino', value: 'F' },
    { label: 'Outro', value: 'O' }
  ];

  alergiasOptions: any[] = [];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      cpf: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      sexo: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cep: ['', Validators.required],
      endereco: [''],
      cidade: [''],
      estado: [''],
      nomeContatoEmergencia: ['', Validators.required],
      telefoneContatoEmergencia: ['', Validators.required],
      alergias: [[]]
    });
  }

  ngOnInit(): void {
    this.carregarAlergias();
  }

  carregarAlergias() {
    this.alergiasOptions = [
      "Poeira",
      "Lactose",
      "Amendoim",
      "Glúten",
      "Frutos do mar",
      "Picada de insetos",
      "Pólen",
      "Medicamentos",
      "Animais domésticos"
    ]
  }

  buscarEndereco() {
    const cep = this.form.get('cep')?.value?.replace(/\D/g, '');
    if (cep?.length === 8) {
      this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).subscribe({
        next: (dados) => {
          if (!dados.erro) {
            this.form.patchValue({
              endereco: dados.logradouro,
              cidade: dados.localidade,
              estado: dados.uf
            });
          } else {
            this.messageService.add({ severity: 'warn', summary: 'CEP inválido', detail: 'Não encontrado.' });
          }
        },
        error: (err) => {
          console.error('Erro ao buscar CEP:', err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao buscar o CEP.' });
        }
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Paciente cadastrado:', this.form.value);
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
