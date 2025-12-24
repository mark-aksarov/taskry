import "server-only";

import {
  CreateCustomerInputDTO,
  CustomerDetailDTO,
  CustomerListItemDTO,
  CustomerSummaryDTO,
} from "./customer.dto";

import {
  mapCustomerDetailToDTO,
  mapCustomerListItemDTO,
  mapCustomerSummaryToDTO,
} from "./customer.mapper";

import {
  customerDetailSelect,
  customerListItemSelect,
  customerSummarySelect,
} from "./customer.select";

import { cache } from "react";
import prisma from "@/lib/prisma";
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
  }: {
    page: number;
    pageSize: number;
  }): Promise<CustomerListItemDTO[]> => {
    const {
      user: { workspaceId },
    } = await getSessionOrThrow();
    const skip = (page - 1) * pageSize;

    const customers = await prisma.customer.findMany({
      where: { workspaceId },
      skip,
      take: pageSize,
      select: customerListItemSelect,
    });

    return customers.map(mapCustomerListItemDTO);
  },
);

export const getCustomerCount = cache(async () => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  return prisma.customer.count({
    where: { workspaceId },
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

/**
 * HELPERS
 */

async function validateCustomerRelations(
  workspaceId: number,
  input: Partial<CreateCustomerInputDTO>,
) {
  const company = await prisma.project.findFirst({
    where: { id: input.companyId, workspaceId },
  });

  if (!company) throw new Error("Company access denied or not found");
}
