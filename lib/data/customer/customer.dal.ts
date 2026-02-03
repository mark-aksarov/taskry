import "server-only";

import { cache } from "react";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CustomerFilters } from "@/lib/types";
import { AccessDeniedError } from "../utils/error";
import { requireSession } from "../utils/requireSession";
import { Prisma, ProjectStatus } from "@/generated/prisma/client";
import { CreateCustomerInputDTO, UpdateCustomerInputDTO } from "./customer.dto";

export const getCustomer = cache(
  async <T extends Prisma.CustomerSelect>(id: number, select: T) => {
    const {
      user: { workspaceId },
    } = await requireSession();

    return await prisma.customer.findFirst({
      where: { id, workspaceId },
      select,
    });
  },
);

export const getAllCustomers = cache(
  async <T extends Prisma.CustomerSelect>({ select }: { select: T }) => {
    const {
      user: { workspaceId },
    } = await requireSession();

    let where = { workspaceId };

    return await prisma.customer.findMany({
      where,
      select,
    });
  },
);

export const getPaginatedCustomers = cache(
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
    } = await requireSession();

    const skip = page && pageSize ? (page - 1) * pageSize : Prisma.skip;
    const take = pageSize ? pageSize : Prisma.skip;

    const orderByMapping: Record<
      string,
      | Prisma.CustomerOrderByWithRelationInput
      | Prisma.CustomerOrderByWithRelationInput[]
    > = {
      fullName: { fullName: "asc" },
      company: [{ company: { name: "asc" } }, { fullName: "asc" }],
    };

    const orderBy = sort ? orderByMapping[sort] : Prisma.skip;
    const where = buildCustomerWhereClause(workspaceId, filters);

    const [items, totalCount] = await Promise.all([
      prisma.customer.findMany({
        where,
        orderBy,
        skip,
        take,
        select,
      }),
      prisma.customer.count({ where }),
    ]);

    return {
      items,
      totalCount,
    };
  },
);

export const getCustomerCount = cache(async (filters?: CustomerFilters) => {
  const {
    user: { workspaceId },
  } = await requireSession();

  return prisma.customer.count({
    where: buildCustomerWhereClause(workspaceId, filters),
  });
});

export const deleteCustomers = async (ids: number[]) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: userId,
      permission: {
        customer: ["delete"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to delete customers.",
    );
  }

  // Bulk delete customers within the workspace
  const deletedCustomers = await prisma.customer.deleteMany({
    where: {
      workspaceId,
      id: { in: ids },
    },
  });

  return deletedCustomers;
};

export const createCustomer = async (input: CreateCustomerInputDTO) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: userId,
      permission: {
        customer: ["create"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to create customers.",
    );
  }

  // Check related resources access
  await checkCustomerResourcesAccess(workspaceId, input.companyId);

  // Create customer
  const customer = await prisma.customer.create({
    data: {
      fullName: input.fullName,
      bio: input.bio ?? Prisma.skip,
      imageUrl: input.imageUrl ?? Prisma.skip,
      companyId: input.companyId,
      email: input.email,
      phoneNumber: input.phoneNumber ?? Prisma.skip,
      publicLink: input.publicLink ?? Prisma.skip,
      workspaceId,
    },
  });

  return customer;
};

export const updateCustomer = async (input: UpdateCustomerInputDTO) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: userId,
      permission: {
        customer: ["update"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to update customers.",
    );
  }

  // Check related resources access
  await checkCustomerResourcesAccess(workspaceId, input.companyId);

  // Update customer
  const updatedCustomer = await prisma.customer.update({
    where: {
      id: input.id,
      workspaceId,
    },
    data: {
      fullName: input.fullName ?? Prisma.skip,
      bio: input.bio ?? Prisma.skip,
      imageUrl: input.imageUrl ?? Prisma.skip,
      companyId: input.companyId ?? Prisma.skip,
      email: input.email ?? Prisma.skip,
      phoneNumber: input.phoneNumber ?? Prisma.skip,
      publicLink: input.publicLink ?? Prisma.skip,
    },
  });

  return updatedCustomer;
};

/**
 * HELPERS
 */

async function checkCustomerResourcesAccess(
  workspaceId: number,
  companyId?: number,
) {
  if (companyId) {
    const company = await prisma.company.findFirst({
      where: { id: companyId, workspaceId },
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

  const projectFilters: Prisma.CustomerWhereInput[] = [];

  if (filters?.hasNoActiveProjects) {
    projectFilters.push({
      projects: { none: { status: ProjectStatus.active } },
    });
  }

  if (filters?.hasActiveProjects) {
    projectFilters.push({
      projects: { some: { status: ProjectStatus.active } },
    });
  }

  if (filters?.hasOverdueProjects) {
    projectFilters.push({
      projects: {
        some: {
          status: { not: ProjectStatus.completed },
          deadline: { lt: new Date() },
        },
      },
    });
  }

  return {
    workspaceId,

    ...(filters.query && {
      OR: [
        { fullName: { contains: filters.query, mode: "insensitive" as const } },
      ],
    }),

    ...(filters?.company?.length && { companyId: { in: filters.company } }),
    ...(projectFilters.length > 0 && { OR: projectFilters }),
  };
}
