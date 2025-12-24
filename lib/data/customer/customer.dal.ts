import "server-only";

import {
  CustomerDetailDTO,
  CustomerSummaryDTO,
  CustomerListItemDTO,
  UpdateCustomerInputDTO,
  CreateCustomerInputDTO,
  CustomerFilters,
} from "./customer.dto";

import {
  mapCustomerDetailToDTO,
  mapCustomerListItemDTO,
  mapCustomerSummaryToDTO,
  mapCustomerFormDataToDTO,
} from "./customer.mapper";

import {
  customerDetailSelect,
  customerFormDataSelect,
  customerListItemSelect,
  customerSummarySelect,
} from "./customer.select";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { Prisma, ProjectStatus } from "@/generated/prisma/client";
import { getSessionOrThrow } from "@/lib/data/utils/getSessionOrThrow";

export const getCustomerSummaries = cache(
  async (): Promise<CustomerSummaryDTO[]> => {
    const {
      user: { workspaceId },
    } = await getSessionOrThrow();

    const customers = await prisma.customer.findMany({
      where: { workspaceId },
      select: customerSummarySelect,
    });

    return customers.map(mapCustomerSummaryToDTO);
  },
);

export const getCustomerFormData = cache(async (id: number) => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  const data = await prisma.customer.findFirst({
    where: { id, workspaceId },
    select: customerFormDataSelect,
  });

  if (!data) throw new Error("Customer not found");

  return mapCustomerFormDataToDTO(data);
});

export const getCustomerDetail = cache(
  async (id: number): Promise<CustomerDetailDTO> => {
    const {
      user: { workspaceId },
    } = await getSessionOrThrow();

    const data = await prisma.customer.findFirst({
      where: { id, workspaceId },
      select: customerDetailSelect,
    });

    if (!data) throw new Error("Customer not found");

    return mapCustomerDetailToDTO(data);
  },
);

export const getCustomerList = cache(
  async ({
    page,
    pageSize,
    sort,
    filters,
  }: {
    page: number;
    pageSize: number;
    sort: string;
    filters?: CustomerFilters;
  }): Promise<CustomerListItemDTO[]> => {
    const {
      user: { workspaceId },
    } = await getSessionOrThrow();

    const skip = (page - 1) * pageSize;

    const orderByMapping: Record<
      string,
      Prisma.CustomerOrderByWithRelationInput
    > = {
      fullName: { fullName: "asc" },
      company: { company: { name: "asc" } },
    };

    const customers = await prisma.customer.findMany({
      where: buildCustomerWhereClause(workspaceId, filters),
      orderBy: [orderByMapping[sort] || { fullName: "asc" }],
      skip,
      take: pageSize,
      select: customerListItemSelect,
    });

    return customers.map(mapCustomerListItemDTO);
  },
);

export const getCustomerCount = cache(async (filters?: CustomerFilters) => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  return prisma.customer.count({
    where: buildCustomerWhereClause(workspaceId, filters),
  });
});

export const deleteCustomers = async (ids: number[]) => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  const { count } = await prisma.customer.deleteMany({
    where: {
      workspaceId,
      id: { in: ids },
    },
  });

  if (count === 0) throw new Error("No customers deleted.");

  return count;
};

export const createCustomer = async (input: CreateCustomerInputDTO) => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  await validateCustomerRelations(workspaceId, input);

  await prisma.customer.create({
    data: {
      ...input,
      workspaceId,
    },
  });
};

export const updateCustomer = async (input: UpdateCustomerInputDTO) => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  await validateCustomerRelations(workspaceId, input);

  await prisma.customer.update({
    where: {
      id: input.id,
      workspaceId,
    },
    data: input,
  });
};

/**
 * HELPERS
 */

async function validateCustomerRelations(
  workspaceId: number,
  input: Partial<CreateCustomerInputDTO>,
) {
  if (input.companyId) {
    const company = await prisma.project.findFirst({
      where: { id: input.companyId, workspaceId },
    });

    if (!company) throw new Error("Company access denied or not found");
  }
}

export function buildCustomerWhereClause(
  workspaceId: number,
  filters?: CustomerFilters,
): Prisma.CustomerWhereInput {
  if (!filters) return { workspaceId };

  return {
    workspaceId,
    ...(filters.hasNoActiveProjects && {
      projects: { none: { status: ProjectStatus.active } },
    }),

    ...(filters.hasActiveProjects && {
      projects: { some: { status: ProjectStatus.active } },
    }),

    ...(filters.hasOverdueProjects && {
      projects: {
        some: {
          status: { not: ProjectStatus.completed },
          deadline: { lt: new Date() },
        },
      },
    }),

    ...(filters.company?.length && { companyId: { in: filters.company } }),
  };
}
