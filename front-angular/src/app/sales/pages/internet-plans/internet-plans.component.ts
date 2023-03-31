import { Component, OnInit, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AlertsService } from '../../services/alerts/alerts.service';
import { NetPlansService } from '../../services/net-plans/net-plans.service';
import { PagesValidatorService } from '../../services/pages-validator/pages-validator.service';

import { InternetPlan } from '../../models/sales';
import { AlertMsgs } from '../../utils/alert-msgs';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import {MatTooltip, MatTooltipModule, TooltipPosition} from '@angular/material/tooltip';


@Component({
  selector: 'app-internet-plans',
  templateUrl: './internet-plans.component.html',
  styleUrls: ['./internet-plans.component.scss'],
})
export class InternetPlansComponent implements OnInit, OnChanges {

  selectedPlan: InternetPlan | undefined;
  selectedObject: InternetPlan | undefined;

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  @ViewChild('radioBtn', { static: false })
  radioBtn!: ElementRef;

  constructor(private http: HttpClient, private netPlansService: NetPlansService, private pagesValidatorService: PagesValidatorService, private alertsService: AlertsService, private router: Router) {}

  netPlans: InternetPlan[] = []

  ngOnInit() {
    this.getNetPlans();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('A variável foi alterada:', changes['netPlans'].currentValue);
    if(changes['netPlans'].currentValue) {
      setTimeout(() => {
        this.alertsService.success({...AlertMsgs.netPlans.success, title: `${changes['netPlans'].currentValue.length} ${AlertMsgs.netPlans.success.title}`});
      }, 5000);
    }
  }


  // async getNetPlans() {
  //   if (this.netPlansService) {
  //     this.netPlansService.getNetPlans().subscribe(
  //       (response: InternetPlan[]) => {
  //         this.netPlans = response;
  //       },
  //       (error: any) => {
  //         console.error(error);
  //       }
  //     );
  //   }
  // }

  async getNetPlans() {
    if (this.netPlansService) {
      this.netPlansService.getNetPlans().subscribe({
        next: (response: InternetPlan[]) => {
          this.netPlans = response;
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    }
  }

  // onSelectionChange(plan: InternetPlan): void {
  //   // this.selectedPlan = plan
  //   // if (this.radioBtn) {
  //   //   this.radioBtn.nativeElement.checked(true);
  //   // }
  // }

  // submit(): void {
  //   if (this.selectedPlan) {
  //     this.pagesValidatorService.setPlan(this.selectedObject);
  //     // this.router.navigate(['/cadastro-usuario']);
  //     return;
  //   }
  //   this.alertsService.warning(AlertMsgs.netPlans.warning);
  // }

  onSelectionChange(card: InternetPlan): void {
    if (this.selectedPlan === card) {
      this.selectedPlan = undefined;
    } else {
      this.selectedPlan = card;
    }
  }

  submit(): void {
    if (this.selectedPlan) {
      this.pagesValidatorService.setPlan(this.selectedPlan);
      this.router.navigate(['/cadastro-usuario']);
      return;
    }
    this.alertsService.warning(AlertMsgs.netPlans.warning);
  }
}
