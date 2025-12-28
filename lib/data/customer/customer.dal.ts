import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { CustomerFilters } from "@/lib/types";
import { AccessDeniedError } from "../utils/error";
import { verifySession } from "../utils/verifySession";
import { Prisma, ProjectStatus } from "@/generated/prisma/client";
import { CreateCustomerInputDTO, UpdateCustomerInputDTO } from "./customer.dto";

export const getCustomer = cache(
  async <T extends Prisma.CustomerSelect>(id: number, select: T) => {
    const {
      user: { workspaceId },
    } = await verifySession();

    return await prisma.customer.findFirst({
      where: { id, workspaceId },
      select,
    });
  },
);

export const getAllCustomers = cache(
  async <T extends Prisma.CustomerSelect>({
    page,
    pageSize,
    sort,
    filters,
    select,
  }: {
    page?: number;
    pageSize?: number;
    sort?: string;
    filters?: CustomerFilters;
    select: T;
  }) => {
    const {
      user: { workspaceId },
    } = await verifySession();

    const skip = page && pageSize ? (page - 1) * pageSize : undefined;
    const take = pageSize ? pageSize : undefined;

    const orderByMapping: Record<
      string,
      Prisma.CustomerOrderByWithRelationInput
    > = {
      fullName: { fullName: "asc" },
      company: { company: { name: "asc" } },
    };

    const orderBy = sort ? orderByMapping[sort] : undefined;

    return await prisma.customer.findMany({
      where: buildCustomerWhereClause(workspaceId, filters),
      orderBy,
      skip,
      take,
      select,
    });
  },
);

export const getCustomerCount = cache(async (filters?: CustomerFilters) => {
  const {
    user: { workspaceId },
  } = await verifySession();

  return prisma.customer.count({
    where: buildCustomerWhereClause(workspaceId, filters),
  });
});

export const deleteCustomers = async (ids: number[]) => {
  const {
    user: { workspaceId },
  } = await verifySession();

  return await prisma.customer.deleteMany({
    where: {
      workspaceId,
      id: { in: ids },
    },
  });
};

export const createCustomer = async (input: CreateCustomerInputDTO) => {
  const {
    user: { workspaceId },
  } = await verifySession();

  await validateCustomerRelations(workspaceId, input);

  return await prisma.customer.create({
    data: {
      ...input,
      workspaceId,
    },
  });
};

export const updateCustomer = async (input: UpdateCustomerInputDTO) => {
  const {
    user: { workspaceId },
  } = await verifySession();

  await validateCustomerRelations(workspaceId, input);

  return await prisma.customer.update({
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
    const company = await prisma.company.findFirst({
      where: { id: input.companyId, workspaceId },
    });

    if (!company) {
      throw new AccessDeniedError("Company access denied or not found");
    }
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
