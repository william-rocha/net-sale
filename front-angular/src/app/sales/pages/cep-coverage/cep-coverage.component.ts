import { Component, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CepCoverageService } from '../../services/cep-coverage/cep-coverage.service';

import { MatDialog } from '@angular/material/dialog';
import { Masks } from '../../utils/masks';
import { PagesValidatorService } from '../../services/pages-validator/pages-validator.service';

@Component({
  selector: 'app-cep-coverage',
  templateUrl: './cep-coverage.component.html',
  styleUrls: ['./cep-coverage.component.scss'],
})
export class CepCoverageComponent {
  form!: FormGroup;
  cepMask = Masks.cepMask;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private cepCoverageService: CepCoverageService,
    private pagesValidatorService: PagesValidatorService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      cep: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{2}\.[0-9]{3}\-[0-9]{3}$/),
        ],
      ],
    });

    this.populateAdressByCep();
  }

  onSubmit() {
    if (this.form.valid) {
      this.cepCoverageService.getByCep({
        cep: this.form.value.cep.replace(/[.-]/g, ''),
      });
    }
  }

  populateAdressByCep() {
    const endereco_cep = this.pagesValidatorService.getCep();
    if (endereco_cep) {

      const formattedCep = endereco_cep.cep.replace(
        /^(\d{2})(\d{3})(\d{3})$/,
        '$1.$2-$3'
      );
      this.form.patchValue({
        cep: formattedCep,
      });
    }
  }
}
