import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { AlertsService } from '../../services/alerts/alerts.service';
import { NetPlansService } from '../../services/net-plans/net-plans.service';
import { PagesValidatorService } from '../../services/pages-validator/pages-validator.service';

import { InternetPlan } from '../../models/sales';
import { AlertMsgs } from '../../utils/alert-msgs';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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

  cols: number = 3;

  constructor(
    private netPlansService: NetPlansService,
    private pagesValidatorService: PagesValidatorService,
    private alertsService: AlertsService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  netPlans: InternetPlan[] = [];

  ngOnInit() {
    this.getNetPlans();

    const plan = this.pagesValidatorService.getPlan()
    if (plan) {
      this.selectedPlan = plan
    }
    this.breakpointObserver
      .observe([
        Breakpoints.HandsetPortrait, // Define breakpoints para tamanhos de tela
        Breakpoints.TabletPortrait,
        Breakpoints.WebPortrait,
      ])
      .subscribe((result) => {
        if (result.breakpoints[Breakpoints.HandsetPortrait]) {
          this.cols = 1;
        } else if (result.breakpoints[Breakpoints.TabletPortrait]) {
          this.cols = 2;
        } else if (result.breakpoints[Breakpoints.WebPortrait]) {
          this.cols = 3;
        }
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['netPlans'].currentValue) {
        this.alertsService.success({
          ...AlertMsgs.netPlans.success,
          title: `${changes['netPlans'].currentValue.length} ${AlertMsgs.netPlans.success.title}`,
        });
    }
  }

  async getNetPlans() {
    if (this.netPlansService) {
      this.netPlansService.getNetPlans().subscribe({
        next: (response: InternetPlan[]) => {
          this.netPlans = response;
        },
        error: (error: any) => {
          console.error(error);
        },
      });
    }
  }

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
