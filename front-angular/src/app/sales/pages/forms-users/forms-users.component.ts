import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserClientService } from '../../services/user-client/user-client.service';
import { PagesValidatorService } from '../../services/pages-validator/pages-validator.service';

import { Cep } from './../../models/sales';
import { Masks } from './../../utils/masks';
import { AlertsService } from '../../services/alerts/alerts.service';
import { AlertMsgs } from '../../utils/alert-msgs';

@Component({
  selector: 'app-forms-users',
  templateUrl: './forms-users.component.html',
  styleUrls: ['./forms-users.component.scss'],
})
export class FormsUsersComponent implements OnInit {
  form = this.fb.group({
    nome: [''],
    cpf: [
      '',
      [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)],
    ],
    rg: [''],
    data_nascimento: ['', Validators.required],
    telefone: ['', [Validators.required]],
    telefone_secundario: [
      '',
      [Validators.minLength(12), Validators.maxLength(14)],
    ],
    email: ['', [Validators.email, Validators.maxLength(50)]],
    endereco_cep: this.fb.group({
      rua: [''],
      bairro: [''],
      cep: [''],
      cidade: [''],
      estado: [''],

      endereco: ['', [Validators.required, Validators.maxLength(100)]],
      numero: ['', [Validators.required, Validators.maxLength(10)]],
      complemento: ['', [Validators.minLength(3), Validators.maxLength(50)]],
      referencia: ['', [Validators.minLength(3), Validators.maxLength(50)]],
    }),
    nome_pai: ['', [Validators.minLength(3), Validators.maxLength(50)]],
    nome_mae: ['', [Validators.minLength(3), Validators.maxLength(50)]],
    estado_civil: [''],
    genero: [''],
    vendedor: [''],
    observacao: ['', [Validators.minLength(3), Validators.maxLength(200)]],
    nacionalidade: [''],
    profissao: ['', [Validators.minLength(3), Validators.maxLength(50)]],
    dia_vencimento: [''],
    tipo_pessoa: ['pessoa-fisica'],
  });

  dias: any[] = [];
  fields: any;

  cpfMask = Masks.cpfMask;
  rgMask = Masks.rgMask;
  phoneMask = Masks.phoneMask;

  constructor(
    private fb: FormBuilder,
    private userClientService: UserClientService,
    private pagesValidatorService: PagesValidatorService,
    private alertsService: AlertsService
  ) {}

  diasVencimentoOptions = [
    { label: '1', value: '15' },
    { label: '2', value: '30' },
    { label: '3', value: '20' },
  ];

  vendedoresOptions = [
    { label: '1', value: 'Vendedor 1' },
    { label: '2', value: 'Vendedor 2' },
    { label: '3', value: 'Vendedor 3' },
  ];

  estadoCivilOptions = [
    { label: 'Solteiro', value: 'Solteiro' },
    { label: 'Casado', value: 'Casado' },
    { label: 'Divorciado', value: 'Divorciado' },
    { label: 'Viúvo', value: 'Viúvo' },
  ];

  generosOptions = [
    { value: 'masculino', label: 'Masculino' },
    { value: 'feminino', label: 'Feminino' },
    { value: 'nao-binario', label: 'Não binário' },
    { value: 'outro', label: 'Outro' },
  ];

  nacionalidadeOptions = [
    { value: 'Brasileiro', label: 'Brasileiro' },
    { value: 'Estrangeiro', label: 'Estrangeiro' },
  ];

  autocompletCep: Cep | undefined;

  ngOnInit() {
    const endereco = this.pagesValidatorService.getCep();
    if (endereco) {
      this.form.patchValue({
        endereco_cep: {
          rua: endereco.rua,
          bairro: endereco.bairro,
          cep: endereco.cep,
          cidade: endereco.cidade,
          estado: endereco.estado,
        },
      });
      this.form.get('endereco_cep.rua')?.disable();
      this.form.get('endereco_cep.bairro')?.disable();
      this.form.get('endereco_cep.cep')?.disable();
      this.form.get('endereco_cep.estado')?.disable();
      this.form.get('endereco_cep.cidade')?.disable();
    }
  }

  submit() {
    if (this.form.valid) {
      this.userClientService.saveUser(this.form.value);
    } else {
      this.alertsService.error(AlertMsgs.userClient.error);
    }
  }
}
