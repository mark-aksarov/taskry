import {
  CustomerListDTO,
  CustomerDetailDTO,
  CustomerSummaryDTO,
  CustomerFormDataDTO,
  CustomerSearchDTO,
} from "./customer.dto";

import { CustomerFilters } from "@/lib/types";
import {
  getAllCustomers,
  getCustomer,
  getPaginatedCustomers,
} from "./customer.dal";

export const getCustomerDetail = async (
  id: number,
): Promise<CustomerDetailDTO | null> => {
  const customer = await getCustomer(id, {
    id: true,
    fullName: true,
    email: true,
    phoneNumber: true,
    imageUrl: true,
    publicLink: true,
    bio: true,
    workspaceId: true,

    company: {
      select: {
        name: true,
      },
    },
  });

  if (!customer) {
    return null;
  }

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

export const getCustomerFormData = async (
  id: number,
): Promise<CustomerFormDataDTO | null> => {
  const customer = await getCustomer(id, {
    id: true,
    fullName: true,
    email: true,
    phoneNumber: true,
    imageUrl: true,
    publicLink: true,
    bio: true,
    companyId: true,
  });

  if (!customer) {
    return null;
  }

  return {
    id: customer.id,
    fullName: customer.fullName,
    email: customer.email,
    phoneNumber: customer.phoneNumber ?? undefined,
    imageUrl: customer.imageUrl ?? undefined,
    publicLink: customer.publicLink ?? undefined,
    bio: customer.bio ?? undefined,
    companyId: customer.companyId,
  };
};

export const getCustomerList = async ({
  page,
  pageSize,
  sort,
  filters,
}: {
  page: number;
  pageSize: number;
  sort: string;
  filters?: CustomerFilters;
}): Promise<CustomerListDTO> => {
  const { items: customers, totalCount } = await getPaginatedCustomers({
    page,
    pageSize,
    sort,
    filters,
    select: {
      id: true,
      fullName: true,
      email: true,
      phoneNumber: true,
      publicLink: true,
      imageUrl: true,

      company: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return {
    items: customers.map((customer) => ({
      id: customer.id,
      fullName: customer.fullName,
      email: customer.email,
      phoneNumber: customer.phoneNumber ?? undefined,
      imageUrl: customer.imageUrl ?? undefined,
      publicLink: customer.publicLink ?? undefined,
      company: customer.company ?? undefined,
    })),
    totalCount,
  };
};

export const searchCustomers = async ({
  query,
  page,
  pageSize,
}: {
  query?: string;
  page: number;
  pageSize: number;
}): Promise<CustomerSearchDTO> => {
  const { items, totalCount } = await getPaginatedCustomers({
    page,
    pageSize,
    select: {
      id: true,
      fullName: true,
      email: true,
      imageUrl: true,
    },
    filters: { query },
  });

  return {
    items: items.map((c) => ({
      id: c.id,
      fullName: c.fullName,
      email: c.email,
      imageUrl: c.imageUrl ?? undefined,
    })),

    totalCount,
  };
};

export const getCustomerSummaries = async (): Promise<CustomerSummaryDTO[]> => {
  const customers = await getAllCustomers({
    select: {
      id: true,
      fullName: true,
    },
  });

  return customers.map((customer) => ({
    id: customer.id,
    fullName: customer.fullName,
  }));
};
