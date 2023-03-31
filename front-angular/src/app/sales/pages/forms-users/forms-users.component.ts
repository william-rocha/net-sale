import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserClientService } from '../../services/user-client/user-client.service';
import { PagesValidatorService } from '../../services/pages-validator/pages-validator.service';

import { Cep } from './../../models/sales';
import { Masks } from './../../utils/masks';


@Component({
  selector: 'app-forms-users',
  templateUrl: './forms-users.component.html',
  styleUrls: ['./forms-users.component.scss'],
})
export class FormsUsersComponent implements OnInit {
  form!: FormGroup;
  vendedores: any[] = [];
  dias: any[] = [];

  cpfMask = Masks.cpfMask
  rgMask = Masks.rgMask
  phoneMask = Masks.phoneMask

  constructor(private fb: FormBuilder, private userClientService: UserClientService, private pagesValidatorService: PagesValidatorService) {

    this.vendedores = [
      { id: 1, nome: 'Vendedor 1' },
      { id: 2, nome: 'Vendedor 2' },
      { id: 3, nome: 'Vendedor 3' },
    ];
    this.dias = [
      { id: 1, vencimento: '15' },
      { id: 2, vencimento: '30' },
      { id: 3, vencimento: '20' },
    ];
  }

  autocompletCep: Cep | undefined

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      nome: ['', Validators.required, Validators.maxLength(50), Validators.minLength(3)],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      rg: ['', Validators.required],
      data_nascimento: ['', Validators.required],
      telefone: ['', [Validators.required]],
      telefone_secundario: ['', [Validators.minLength(10), Validators.maxLength(11)]],
      email: ['', [Validators.email, Validators.maxLength(50)]],
      endereco: ['', [Validators.required, Validators.maxLength(100)]],
      bairro: ['', [Validators.required, Validators.maxLength(50)]],
      numero: ['', [Validators.required, Validators.maxLength(10)]],
      complemento: ['', [Validators.minLength(3), Validators.maxLength(50)]],
      referencia: ['', [Validators.minLength(3), Validators.maxLength(50)]],
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
  }

  submit() {
    if (this.form) {
      this.userClientService.saveUser(this.form.value)
    }
  }
}
