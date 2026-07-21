import "server-only";

import {
  CustomerDTO,
  CustomerListDTO,
  mapToCustomerDTO,
  CustomerDetailDTO,
  CustomerSearchDTO,
  CustomerSummaryDTO,
  CreateCustomerInputDTO,
  UpdateCustomerInputDTO,
  UpdateCustomerImageUrlInputDTO,
} from "./customer.dto";

import { cache } from "react";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { AccessDeniedError } from "../utils/error";
import { requireSession } from "../utils/requireSession";
import { uniqueDefinedIds } from "../utils/uniqueDefinedIds";
import { CustomerFilters, CustomerSortField } from "@/lib/types";
import { Prisma, ProjectStatus } from "@/generated/prisma/client";
import { validateCompanies, validateCustomerLimit } from "../utils/validation";

export const getCustomerDetail = cache(
  async (id: number): Promise<CustomerDetailDTO | null> => {
    // Authorization
    const {
      user: { workspaceId },
    } = await requireSession();

    // Get customer
    const customer = await prisma.customer.findFirst({
      where: { id, workspaceId },
      select: {
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
      },
    });

    if (!customer) {
      return null;
    }

    //Map to CustomerDetailDTO
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
  },
);

export const getCustomer = cache(
  async (id: number): Promise<CustomerDTO | null> => {
    // Authorization
    const {
      user: { workspaceId },
    } = await requireSession();

    // Get customer
    const customer = await prisma.customer.findFirst({
      where: { id, workspaceId },
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        imageUrl: true,
        publicLink: true,
        bio: true,
        companyId: true,
      },
    });

    if (!customer) {
      return null;
    }

    return mapToCustomerDTO(customer);
  },
);

export const getCustomerSummary = cache(
  async (id: number): Promise<CustomerSummaryDTO | null> => {
    // Authorization
    const {
      user: { workspaceId },
    } = await requireSession();

    const customer = await prisma.customer.findFirst({
      where: { id, workspaceId },
      select: {
        id: true,
        fullName: true,
      },
    });

    if (!customer) {
      return null;
    }

    //Map to CustomerSummaryDTO
    return {
      id: customer.id,
      fullName: customer.fullName,
    };
  },
);

export const getCustomerSummaries = cache(
  async (): Promise<CustomerSummaryDTO[]> => {
    // Authorization
    const {
      user: { workspaceId },
    } = await requireSession();

    const where = { workspaceId };

    // Get customers
    const customers = await prisma.customer.findMany({
      where,
      select: {
        id: true,
        fullName: true,
      },
    });

    //Map to CustomerSummaryDTOs
    return customers.map((customer) => ({
      id: customer.id,
      fullName: customer.fullName,
    }));
  },
);

export const getCustomers = cache(async (): Promise<CustomerDTO[]> => {
  // Authorization
  const {
    user: { workspaceId },
  } = await requireSession();

  const customers = await prisma.customer.findMany({
    where: { workspaceId },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      phoneNumber: true,
      imageUrl: true,
      publicLink: true,
      bio: true,
      companyId: true,
    },
  });

  return customers.map(mapToCustomerDTO);
});

export const searchCustomers = cache(
  async ({
    query,
    page,
    pageSize,
  }: {
    query?: string;
    page?: number;
    pageSize?: number;
  }): Promise<CustomerSearchDTO> => {
    // Authorization
    const {
      user: { workspaceId },
    } = await requireSession();

    // Get customers
    const where = {
      workspaceId,
      fullName: { contains: query, mode: "insensitive" as const },
    };

    const [items, totalCount] = await Promise.all([
      prisma.customer.findMany({
        where,
        orderBy: { fullName: "asc" },
        skip: page && pageSize ? (page - 1) * pageSize : undefined,
        take: pageSize,
        select: {
          id: true,
          fullName: true,
          email: true,
          imageUrl: true,
        },
      }),
      prisma.customer.count({ where }),
    ]);

    //Map to CustomerSearchDTO
    return {
      items: items.map((c) => ({
        id: c.id,
        fullName: c.fullName,
        email: c.email,
        imageUrl: c.imageUrl ?? undefined,
      })),
      totalCount,
    };
  },
);

export const getCustomerList = cache(
  async ({
    page,
    pageSize,
    sort,
    filters,
  }: {
    page?: number;
    pageSize?: number;
    sort?: CustomerSortField;
    filters?: CustomerFilters;
  }): Promise<CustomerListDTO> => {
    // Authorization
    const {
      user: { workspaceId },
    } = await requireSession();

    const where = buildCustomerWhereClause(workspaceId, filters);

    // Sorting
    let orderBy;

    if (sort === "company") {
      orderBy = [
        {
          company: {
            name: "asc",
          },
        },
        {
          fullName: "asc",
        },
      ] as Prisma.CustomerOrderByWithRelationInput[];
    } else if (sort === "fullName") {
      orderBy = {
        fullName: "asc",
      } as Prisma.CustomerOrderByWithRelationInput;
    }

    // Get customers
    const [items, totalCount] = await Promise.all([
      prisma.customer.findMany({
        where,
        orderBy,
        skip: page && pageSize ? (page - 1) * pageSize : undefined,
        take: pageSize,
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
      }),
      prisma.customer.count({ where }),
    ]);

    //Map to CustomerListDTO
    return {
      items: items.map((customer) => ({
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
  },
);

export const getCustomerCount = cache(async (filters?: CustomerFilters) => {
  // Authorization
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

  // Check permissions
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
  const result = await prisma.customer.deleteMany({
    where: {
      workspaceId,
      id: { in: ids },
    },
  });

  return result;
};

export const createCustomers = async (input: CreateCustomerInputDTO[]) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // Check permissions
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

  // Validate limit
  await validateCustomerLimit(workspaceId, input.length);

  // Validate companies
  const companyIds = uniqueDefinedIds(
    input.map((customer) => customer.companyId),
  );

  if (companyIds.length > 0) {
    await validateCompanies(workspaceId, companyIds);
  }

  // Create customers
  const customers = await prisma.customer.createManyAndReturn({
    data: input.map((customer) => ({
      fullName: customer.fullName,
      bio: customer.bio,
      companyId: customer.companyId,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
      publicLink: customer.publicLink,
      imageUrl: customer.imageUrl,
      workspaceId,
    })),
  });

  return customers.map(mapToCustomerDTO);
};

export const updateCustomer = async (input: UpdateCustomerInputDTO) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // Check permissions
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

  // Validate company
  if (input.companyId) {
    await validateCompanies(workspaceId, [input.companyId]);
  }

  // Update customer
  const updatedCustomer = await prisma.customer.update({
    where: {
      id: input.id,
      workspaceId,
    },
    data: {
      fullName: input.fullName,
      bio: input.bio,
      companyId: input.companyId,
      email: input.email,
      phoneNumber: input.phoneNumber,
      publicLink: input.publicLink,
    },
  });

  return mapToCustomerDTO(updatedCustomer);
};

export const updateCustomerImageUrl = async (
  input: UpdateCustomerImageUrlInputDTO,
) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // Check permissions
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

  // Update customer
  const updatedCustomer = await prisma.customer.update({
    where: {
      id: input.id,
      workspaceId,
    },
    data: {
      imageUrl: input.imageUrl,
    },
  });

  return mapToCustomerDTO(updatedCustomer);
};

/**
 * HELPERS
 */

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
    ...(filters?.query && {
      fullName: { contains: filters.query, mode: "insensitive" as const },
    }),
    ...(filters?.companyIds?.length && {
      companyId: { in: filters.companyIds },
    }),
    ...(projectFilters.length > 0 && { OR: projectFilters }),
  };
}
