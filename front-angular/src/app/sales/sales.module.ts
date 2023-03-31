import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { SalesRoutingModule } from './sales-routing.module';

import { CepCoverageComponent } from './pages/cep-coverage/cep-coverage.component';
import { InternetPlansComponent } from './pages/internet-plans/internet-plans.component';
import { FormsUsersComponent } from './pages/forms-users/forms-users.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { InputComponent } from './components/input/input.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { ButtonCustomComponent } from './components/button-custom/button-custom.component';
import { InputMaskComponent } from './components/input-mask/input-mask.component';
import { TextMaskModule } from 'angular2-text-mask';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  declarations: [
    CepCoverageComponent,
    InternetPlansComponent,
    FormsUsersComponent,
    InputComponent,
    AlertDialogComponent,
    ButtonCustomComponent,
    InputMaskComponent,
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    TextMaskModule,
    FormsModule,
    MatTooltipModule
  ]
})
export class SalesModule { }
