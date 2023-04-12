import { SweetAlertOptions } from 'sweetalert2';

export interface InternetPlan {
  netPlans: any;
  id: number;
  nome: string;
  velocidade: number;
  data_expiracao: Date;
  preco: number;
  descricao: string;
}

export type Alerts = {
  success: SweetAlertOptions;
  error: SweetAlertOptions;
}

export interface Cep {
  cep: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  id?: number;
  rua?: string;
}

export interface Plan {
  id: number | null;
  nome: string;
  descricao: string;
  velocidade: number | null;
  preco: number | null;
  data_expiracao: string | null;
}
