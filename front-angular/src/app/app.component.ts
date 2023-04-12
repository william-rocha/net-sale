import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { PagesValidatorService } from './sales/services/pages-validator/pages-validator.service';
import { AlertsService } from './sales/services/alerts/alerts.service';
import { AlertMsgs } from './sales/utils/alert-msgs';

@Component({
  selector: 'app-root',
  template: `
    <mat-grid-list cols="1" style="overflow-y: auto; height: 100vh">
      <mat-horizontal-stepper
        #stepper
        (selectionChange)="selectionChanged($event)"
        [linear]="true"
        class="nav-header"
      >
        <mat-step
          *ngFor="let step of steps; let i = index"
          [label]="step.title"
          [stepControl]="step.formGroup"
          [editable]="isEditable"
        >
          <router-outlet *ngIf="i === selectedStepIndex"></router-outlet>
        </mat-step>
      </mat-horizontal-stepper>
    </mat-grid-list>
  `,
})
export class AppComponent implements OnInit {
  @ViewChild('stepper') stepper: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private pagesValidatorService: PagesValidatorService,
    private alertsService: AlertsService
  ) {}

  public selectedStepIndex: number = 0;
  isEditable = true;

  ngOnInit() {
    this.pagesValidatorService.cepObservable().subscribe((findCep) => {
      this.cepCanNexPage.patchValue({
        firstCtrl: findCep ? 'true' : '',
      });
      this.stepper.selectedIndex = findCep ? 1 : 0;
    });
    this.pagesValidatorService.planObservable().subscribe((choosePlan) => {
      this.planCanNextPage.patchValue({
        secondCtrl: choosePlan ? 'true' : '',
      });
      this.stepper.selectedIndex = 2;
    });
    this.pagesValidatorService.useObservable().subscribe((registeredUser) => {
      this.userCanNextPage.patchValue({
        thirdCtrl: registeredUser ? 'true' : '',
      });
      this.stepper.selectedIndex = 3;
    });
  }

  canGoToPlan: boolean | null = null;

  cepCanNexPage = this.fb.group({
    firstCtrl: ['', Validators.required],
  });
  planCanNextPage = this.fb.group({
    secondCtrl: ['', Validators.required],
  });
  userCanNextPage = this.fb.group({
    thirdCtrl: ['', Validators.required],
  });

  public steps = [
    {
      title: 'Verificar Cobertura CEP',
      path: 'verificar-cobertura-cep',
      formGroup: this.cepCanNexPage,
    },
    {
      title: 'Selecionar Plano',
      path: 'selecionar-plano',
      formGroup: this.planCanNextPage,
    },
    {
      title: 'Cadastro de Usuário',
      path: 'cadastro-usuario',
      formGroup: this.userCanNextPage,
    },
  ];

  async selectionChanged({ selectedIndex }: any) {
    if (!this.cepCanNexPage.get('firstCtrl')) {
      this.alertsService.warning(AlertMsgs.netPlans.warning);
      return
    }

    await this.navigate(selectedIndex);
    this.selectedStepIndex = selectedIndex;
  }

  async navigate(selectedStepIndex: number): Promise<boolean> {
    return this.router.navigate([
      '/vendas/' + this.steps[selectedStepIndex].path,
    ]);
  }
}
