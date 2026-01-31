import "server-only";

import { cache } from "react";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CustomerFilters } from "@/lib/types";
import { AccessDeniedError } from "../utils/error";
import { requireSession } from "../utils/requireSession";
import {
  NotificationType,
  Prisma,
  ProjectStatus,
} from "@/generated/prisma/client";
import { CreateCustomerInputDTO, UpdateCustomerInputDTO } from "./customer.dto";
import { getNotificationRecipients } from "../notification/notification.dal";

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
      Prisma.CustomerOrderByWithRelationInput
    > = {
      fullName: { fullName: "asc" },
      company: { company: { name: "asc" } },
    };

    const orderBy = sort ? orderByMapping[sort] : Prisma.skip;
    const where = buildCustomerWhereClause(workspaceId, filters);

    const [items, totalCount] = await prisma.$transaction([
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

  return await prisma.$transaction(async (tx) => {
    // Fetch customers before deletion for notifications
    const customersToDelete = await tx.customer.findMany({
      where: {
        workspaceId,
        id: {
          in: ids,
        },
      },
      select: {
        fullName: true,
      },
    });

    if (customersToDelete.length === 0) {
      return {
        count: 0,
      };
    }

    // Bulk delete customers within the workspace
    const result = await tx.customer.deleteMany({
      where: {
        workspaceId,
        id: { in: ids },
      },
    });

    const recipients = await getNotificationRecipients(tx, workspaceId, userId);

    if (recipients.length > 0) {
      await tx.notification.createMany({
        data: customersToDelete.flatMap((customer) =>
          recipients.map((user) => ({
            type: NotificationType.customerDeleted,
            actorId: userId,
            recipientId: user.id,
            workspaceId,
            customerFullName: customer.fullName,
            isRead: false,
          })),
        ),
      });
    }

    return result;
  });
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

  return prisma.$transaction(async (tx) => {
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

    const recipients = await getNotificationRecipients(tx, workspaceId, userId);

    if (recipients.length > 0) {
      await tx.notification.createMany({
        data: recipients.map((user) => ({
          type: NotificationType.customerAdded,
          actorId: userId,
          recipientId: user.id,
          workspaceId,
          customerId: customer.id,
          customerFullName: customer.fullName,
          isRead: false,
        })),
      });
    }

    return customer;
  });
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

  return await prisma.$transaction(async (tx) => {
    const updatedCustomer = await tx.customer.update({
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

    const recipients = await getNotificationRecipients(tx, workspaceId, userId);

    if (recipients.length > 0) {
      await tx.notification.createMany({
        data: recipients.map((user) => ({
          type: NotificationType.customerChanged,
          actorId: userId,
          recipientId: user.id,
          workspaceId,
          customerId: updatedCustomer.id,
          customerFullName: updatedCustomer.fullName,
          isRead: false,
        })),
      });
    }

    return updatedCustomer;
  });
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
