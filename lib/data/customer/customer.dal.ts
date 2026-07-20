import "server-only";

import {
  NotFoundError,
  AccessDeniedError,
  LimitExceededError,
} from "../utils/error";

import {
  CustomerListDTO,
  CustomerDetailDTO,
  CustomerSearchDTO,
  CustomerSummaryDTO,
  CustomerFormDataDTO,
  CreateCustomerInputDTO,
  UpdateCustomerInputDTO,
  UpdateCustomerImageUrlInputDTO,
} from "./customer.dto";

import { cache } from "react";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CUSTOMER_MAX_COUNT } from "../constants";
import { requireSession } from "../utils/requireSession";
import { CustomerFilters, CustomerSortField } from "@/lib/types";
import { Prisma, ProjectStatus } from "@/generated/prisma/client";

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

    //Map to DTO
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

export const getCustomerFormData = cache(
  async (id: number): Promise<CustomerFormDataDTO | null> => {
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

    //Map to DTO
    return {
      id: customer.id,
      fullName: customer.fullName,
      email: customer.email,
      phoneNumber: customer.phoneNumber ?? undefined,
      imageUrl: customer.imageUrl ?? undefined,
      publicLink: customer.publicLink ?? undefined,
      bio: customer.bio ?? undefined,
      companyId: customer.companyId ?? undefined,
    };
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

    //Map to DTO
    return customers.map((customer) => ({
      id: customer.id,
      fullName: customer.fullName,
    }));
  },
);

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

    //Map to DTO
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

    //Map to DTO
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

export const createCustomers = async (input: CreateCustomerInputDTO[]) => {
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

  // Validate limit
  await validateCustomerLimit(workspaceId, input.length);

  // Validate companies
  const companyIds = input
    .map((company) => company.companyId)
    .filter((id): id is number => id !== undefined);

  if (companyIds.length > 0) {
    await validateCompanies(workspaceId, companyIds);
  }

  // Create customer
  const customer = await prisma.customer.createManyAndReturn({
    data: input.map((customer) => ({
      fullName: customer.fullName,
      bio: customer.bio,
      companyId: customer.companyId,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
      publicLink: customer.publicLink,
      workspaceId,
    })),
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

  return updatedCustomer;
};

export const updateCustomerImageUrl = async (
  input: UpdateCustomerImageUrlInputDTO,
) => {
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

  return updatedCustomer;
};

/**
 * HELPERS
 */

// Validate that company exists and belongs to the workspace
async function validateCompanies(workspaceId: number, companyIds: number[]) {
  const companies = await prisma.company.findMany({
    where: {
      id: {
        in: companyIds,
      },
    },
    select: {
      id: true,
      workspaceId: true,
    },
  });

  if (companies.length !== companyIds.length) {
    throw new NotFoundError("Company not found");
  }

  const hasAccessDenied = companies.some(
    (category) => category.workspaceId !== workspaceId,
  );

  if (hasAccessDenied) {
    throw new AccessDeniedError("Company access denied");
  }
}

// Validate that customer limit has not been reached
async function validateCustomerLimit(
  workspaceId: number,
  newCustomersCount: number,
) {
  const existingCount = await prisma.customer.count({
    where: {
      workspaceId,
    },
  });

  if (existingCount + newCustomersCount > CUSTOMER_MAX_COUNT) {
    throw new LimitExceededError(
      `You cannot create more than ${CUSTOMER_MAX_COUNT} customers.`,
    );
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
    ...(filters?.query && {
      fullName: { contains: filters.query, mode: "insensitive" as const },
    }),
    ...(filters?.companyIds?.length && {
      companyId: { in: filters.companyIds },
    }),
    ...(projectFilters.length > 0 && { OR: projectFilters }),
  };
}
