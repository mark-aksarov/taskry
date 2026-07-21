import { Customer } from "@/generated/prisma/browser";

export type CustomerSummaryDTO = {
  id: number;
  fullName: string;
};

export interface CustomerDTO {
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
  imageUrl?: string;
  bio?: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  publicLink?: string;
  companyId?: number;
}

export interface UpdateCustomerInputDTO {
  id: number;
  bio?: string | null;
  fullName?: string;
  email?: string;
  phoneNumber?: string | null;
  publicLink?: string | null;
  companyId?: number | null;
}

export interface UpdateCustomerImageUrlInputDTO {
  id: number;
  imageUrl: string | null;
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

export function mapToCustomerDTO(
  customer: Pick<
    Customer,
    | "id"
    | "imageUrl"
    | "bio"
    | "fullName"
    | "email"
    | "phoneNumber"
    | "publicLink"
    | "companyId"
  >,
): CustomerDTO {
  return {
    id: customer.id,
    imageUrl: customer.imageUrl ?? undefined,
    bio: customer.bio ?? undefined,
    fullName: customer.fullName,
    email: customer.email,
    phoneNumber: customer.phoneNumber ?? undefined,
    publicLink: customer.publicLink ?? undefined,
    companyId: customer.companyId ?? undefined,
  };
}
