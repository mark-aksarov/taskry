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
  companyId?: number;
}

export interface CreateCustomerInputDTO {
  bio: string | null;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  publicLink: string | null;
  companyId: number | null;
}

export interface UpdateCustomerInputDTO {
  id: number;
  bio: string | null;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  publicLink: string | null;
  companyId: number | null;
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

export type CustomerListDTO = {
  items: CustomerListItemDTO[];
  totalCount: number;
};

export type CustomerListItemDTO = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  imageUrl?: string;
  publicLink?: string;

  company?: {
    id: number;
    name: string;
  };
};

export interface CustomerSearchDTO {
  items: CustomerSearchItemDTO[];
  totalCount: number;
}

export interface CustomerSearchItemDTO {
  id: number;
  fullName: string;
  email: string;
  imageUrl?: string;
}
