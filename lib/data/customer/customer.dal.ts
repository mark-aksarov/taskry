import "server-only";

import {
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
import { getSessionOrThrow } from "@/lib/utils/getSessionOrThrow";

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
