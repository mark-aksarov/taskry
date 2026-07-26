export interface CompanyDTO {
  id: number;
  name: string;
}

export interface CreateCompanyInputDTO {
  name: string;
}

export interface UpdateCompanyInputDTO {
  id: number;
  name: string;
}
