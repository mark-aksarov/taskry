import {
  CustomerDetailDTO,
  CustomerSummaryDTO,
  CustomerListItemDTO,
  CustomerFormDataDTO,
} from "./customer.dto";

import {
  CustomerDetailType,
  CustomerSummaryType,
  CustomerListItemType,
  CustomerFormDataType,
} from "./customer.select";

export function mapCustomerSummaryToDTO(
  customer: CustomerSummaryType,
): CustomerSummaryDTO {
  return {
    id: customer.id,
    fullName: customer.fullName,
  };
}

export const mapCustomerFormDataToDTO = (
  customer: CustomerFormDataType,
): CustomerFormDataDTO => ({
  ...customer,
  phoneNumber: customer.phoneNumber ?? undefined,
  imageUrl: customer.imageUrl ?? undefined,
  publicLink: customer.publicLink ?? undefined,
  bio: customer.bio ?? undefined,
  companyId: customer.companyId ?? undefined,
});

export const mapCustomerDetailToDTO = (
  customer: CustomerDetailType,
): CustomerDetailDTO => {
  return {
    id: customer.id,
    fullName: customer.fullName,
    email: customer.email,
    phoneNumber: customer.phoneNumber ?? undefined,
    imageUrl: customer.imageUrl ?? undefined,
    publicLink: customer.publicLink ?? undefined,
    bio: customer.bio ?? undefined,
    workspaceId: customer.workspaceId,
    company: customer.company ? customer.company : undefined,
  };
};

export const mapCustomerListItemDTO = (
  customer: CustomerListItemType,
): CustomerListItemDTO => {
  return {
    id: customer.id,
    fullName: customer.fullName,
    imageUrl: customer.imageUrl ?? undefined,
    email: customer.email,
    phoneNumber: customer.phoneNumber ?? undefined,
    publicLink: customer.publicLink ?? undefined,
    company: customer.company,
  };
};
