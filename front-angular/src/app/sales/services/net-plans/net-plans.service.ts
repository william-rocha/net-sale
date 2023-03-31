import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AlertsService } from '../alerts/alerts.service';
import { InternetPlan } from '../../models/sales';
import { AlertMsgs } from '../../utils/alert-msgs';

import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetPlansService {
  internetPlans: InternetPlan[] = [];

  constructor(private http: HttpClient, private alertsService: AlertsService) {}

  getNetPlans(): Observable<InternetPlan[]> {
    const apiUrl = 'http://localhost:3000/internet-plans';

    return this.http.get<InternetPlan[]>(apiUrl).pipe(
      map(response => response),
      catchError(error => {
        this.alertsService.error(AlertMsgs.cepCoverage.error);
        return of([]);
      })
    );
  }

}
