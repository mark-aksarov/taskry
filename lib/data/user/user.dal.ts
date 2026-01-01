import { cache } from "react";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { UserFilters } from "@/lib/types";
import { verifySession } from "../utils/verifySession";
import { Prisma, TaskStatus } from "@/generated/prisma/client";

export async function canCreateTask() {
  const {
    user: { id },
  } = await verifySession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: id,
      permission: {
        task: ["create"],
      },
    },
  });

  return permission.success;
}

export async function canDeleteTask() {
  const {
    user: { id },
  } = await verifySession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: id,
      permission: {
        task: ["delete"],
      },
    },
  });

  return permission.success;
}

export async function canUpdateTask() {
  const {
    user: { id },
  } = await verifySession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: id,
      permission: {
        task: ["update"],
      },
    },
  });

  return permission.success;
}

export async function canUpdateTaskStatus(assigneeId?: string) {
  const {
    user: { id, role },
  } = await verifySession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: id,
      permission: {
        task: ["update-status"],
      },
    },
  });

  if (!assigneeId) {
    return permission.success;
  }

  // Ownership
  const isOwner = id === assigneeId;

  if (role === "user" && !isOwner) {
    return false;
  }

  return permission.success;
}

export const getUser = cache(
  async <T extends Prisma.UserSelect>(id: string, select: T) => {
    const {
      user: { workspaceId },
    } = await verifySession();

    let where = { id, workspaceId };

    return prisma.user.findFirst({
      where,
      select,
    });
  },
);
export const getAllUsers = cache(
  async <T extends Prisma.UserSelect>({
    page,
    pageSize,
    sort,
    filters,
    select,
  }: {
    page?: number;
    pageSize?: number;
    sort?: string;
    filters?: UserFilters;
    select: T;
  }) => {
    const {
      user: { workspaceId },
    } = await verifySession();

    const skip = page && pageSize ? (page - 1) * pageSize : undefined;
    const take = pageSize ? pageSize : undefined;

    const orderByMapping: Record<string, Prisma.UserOrderByWithRelationInput> =
      {
        fullName: { fullName: "asc" },
        position: { position: { name: "asc" } },
      };

    const orderBy = sort ? orderByMapping[sort] : undefined;

    return await prisma.user.findMany({
      where: buildUserWhereClause(workspaceId, filters),
      orderBy,
      skip,
      take,
      select,
    });
  },
);

export const getUserCount = cache(async (filters?: UserFilters) => {
  const {
    user: { workspaceId },
  } = await verifySession();

  return prisma.user.count({
    where: buildUserWhereClause(workspaceId, filters),
  });
});

export const deleteUsers = async (ids: string[]) => {
  const {
    user: { workspaceId },
  } = await verifySession();

  return await prisma.user.deleteMany({
    where: { workspaceId, id: { in: ids } },
  });
};

/**
 * HELPERS
 */

export function buildUserWhereClause(
  workspaceId: number,
  filters?: UserFilters,
): Prisma.UserWhereInput {
  if (!filters) return { workspaceId };

  return {
    workspaceId,
    ...(filters.hasNoActiveTasks && {
      assignedTasks: { none: { status: TaskStatus.active } },
    }),

    ...(filters.hasActiveTasks && {
      assignedTasks: { some: { status: TaskStatus.active } },
    }),

    ...(filters.hasOverdueTasks && {
      assignedTasks: {
        some: {
          status: { not: TaskStatus.completed },
          deadline: { lt: new Date() },
        },
      },
    }),

    ...(filters.position?.length && { positionId: { in: filters.position } }),
  };
}
