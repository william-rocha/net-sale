import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cep } from '../../models/sales';

@Injectable({
  providedIn: 'root'
})
export class PagesValidatorService {

  cep: Cep = {
    rua: '',
    bairro: '',
    cep: '',
    cidade: '',
    estado: '',
  }

  private cepSubject = new BehaviorSubject<any>(false);
  private planSubject = new BehaviorSubject<any>(false);
  private useSubject = new BehaviorSubject<any>(false);

  constructor() { }

  setCep(value: any): void {
    this.cepSubject.next(value);
  }

  getCep(): any {
    return this.cepSubject.value;
  }

  cepObservable() {
    return this.cepSubject.asObservable();
  }

  setPlan(plan: any) {
    this.planSubject.next(plan);
  }

  getPlan(): any {
    return this.planSubject.value;
  }

  planObservable() {
    return this.planSubject.asObservable();
  }

  setUse(use: any) {
    this.useSubject.next(use);
  }

  getUse(): any {
    return this.useSubject.value;
  }

  useObservable() {
    return this.useSubject.asObservable();
  }
}
