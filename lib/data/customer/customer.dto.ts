export type CustomerSummaryDTO = {
  id: number;
  fullName: string;
};

export interface CustomerFormDataDTO {
  id: number;
  imageUrl?: string;
  bio?: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  publicLink?: string;
  companyId: number;
}

export interface CreateCustomerInputDTO {
  imageUrl?: string;
  bio?: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  publicLink?: string;
  companyId: number;
}

export interface UpdateCustomerInputDTO {
  id: number;
  imageUrl?: string;
  bio?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  publicLink?: string;
  companyId?: number;
}

export type CustomerDetailDTO = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  imageUrl?: string;
  publicLink?: string;
  bio?: string;
  workspaceId: number;

  company?: {
    name: string;
  };
};

export type CustomerListItemDTO = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  imageUrl?: string;
  publicLink?: string;

  company: {
    id: number;
    name: string;
  };
};
