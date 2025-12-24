export type BaseCustomerDTO = {
  id: number;
  imageUrl?: string;
  bio?: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  publicLink?: string;
  companyId: number;
};

export interface CreateCustomerInputDTO extends Omit<BaseCustomerDTO, "id"> {}

export type CustomerSummaryDTO = {
  id: number;
  fullName: string;
};

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
