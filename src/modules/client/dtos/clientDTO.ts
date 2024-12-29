export interface ClientCreateInput {
  clientType: 'COMPANY' | 'INDIVIDUAL';
  cnpj?: string;
  companyName?: string;
  cpf?: string;
  fullName?: string;
  phone: string;
  email: string;
  street?: string;
  district?: string;
  city?: string;
  number?: string;
  state?: string;
  cep?: string;
  responsable?: string;
}

export interface ClientUpdateInput {
  clientType?: 'COMPANY' | 'INDIVIDUAL';
  cnpj?: string;
  companyName?: string;
  cpf?: string;
  fullName?: string;
  phone?: string;
  email?: string;
  street?: string;
  district?: string;
  city?: string;
  number?: string;
  state?: string;
  cep?: string;
  responsable?: string;
}

export interface ClientSearchQuery {
  name?: string;
  email?: string;
  cpf?: string;
  cnpj?: string;
}
