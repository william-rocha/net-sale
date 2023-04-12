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

import { ButtonCustomComponent } from './components/button-custom/button-custom.component';

import { TextMaskModule } from 'angular2-text-mask';
import { MatTooltipModule } from '@angular/material/tooltip';

import { InputCompComponent } from './components/input-comp/input-comp.component';
import { DateCompComponent } from './components/date-comp/date-comp.component';
import { SelectCompComponent } from './components/select-comp/select-comp.component';
import { RadioCompComponent } from './components/radio-comp/radio-comp.component';

@NgModule({
  declarations: [
    CepCoverageComponent,
    InternetPlansComponent,
    FormsUsersComponent,
    ButtonCustomComponent,
    InputCompComponent,
    DateCompComponent,
    SelectCompComponent,
    RadioCompComponent,
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    TextMaskModule,
    FormsModule,
    MatTooltipModule,
  ],
  exports: [InputCompComponent],
})
export class SalesModule {}
