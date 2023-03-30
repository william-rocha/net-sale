import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AlertsService } from '../../services/alerts/alerts.service';
import { NetPlansService } from '../../services/net-plans/net-plans.service';
import { PagesValidatorService } from '../../services/pages-validator/pages-validator.service';

import { InternetPlan } from '../../models/sales';
import { AlertMsgs } from '../../utils/alert-msgs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-internet-plans',
  templateUrl: './internet-plans.component.html',
  styleUrls: ['./internet-plans.component.scss'],
})
export class InternetPlansComponent implements OnInit{

  selectedPlan: InternetPlan | undefined;
  selectedObject: InternetPlan | undefined;

  constructor(private http: HttpClient, private netPlansService: NetPlansService, private pagesValidatorService: PagesValidatorService, private alertsService: AlertsService, private router: Router) {}

  netPlans: InternetPlan[] = []

  ngOnInit() {
    this.getNetPlans();
  }

  async getNetPlans() {
    if (this.netPlansService) {
      this.netPlansService.getNetPlans().subscribe(
        (response: InternetPlan[]) => {
          this.netPlans = response;
          console.log(this.netPlans);
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }

  onSelectionChange(card: InternetPlan): void {
    this.selectedPlan = card
  }

  submit(): void {
    if (this.selectedPlan) {
      this.pagesValidatorService.setPlan(this.selectedObject);
      this.router.navigate(['/cadastro-usuario']); 
      return;
    }
    this.alertsService.warning(AlertMsgs.netPlans.warning);
  }
}
