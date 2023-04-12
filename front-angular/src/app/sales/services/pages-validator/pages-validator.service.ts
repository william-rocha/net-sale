import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cep, Plan } from '../../models/sales';




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

  plan: Plan = {
    id: null,
    nome: "",
    descricao: "",
    velocidade: null,
    preco: null,
    data_expiracao: null
  };

  private cepSubject = new BehaviorSubject<any>(false);
  private planSubject = new BehaviorSubject<any>(false);
  private useSubject = new BehaviorSubject<any>(false);

  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  setCep(value: any): void {
    this.storage.setItem('cep', JSON.stringify(value));
    this.cepSubject.next(value);
  }

  getCep(): Cep | null {
    let cepValue = this.cepSubject.value;

    if (cepValue) {
      return cepValue;
    }

    const cachedCep = this.storage.getItem('cep');

    if (cachedCep) {
      this.cep = JSON.parse(cachedCep);
      cepValue = this.cep;
    }

    return cepValue || null;
  }


  cepObservable() {
    return this.cepSubject.asObservable();
  }

  setPlan(plan: any) {
    this.storage.setItem('plan', JSON.stringify(plan));
    this.planSubject.next(plan);
  }

  getPlan(): any {
    let planValue = this.planSubject.value;

    if (planValue) {
      return planValue;
    }

    const cachedPlan = this.storage.getItem('plan');

    if (cachedPlan) {
      this.plan = JSON.parse(cachedPlan);
      planValue = this.plan;
    }

    return planValue || null;

    // return this.planSubject.value;
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
