import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { UserFilters } from "@/lib/types";
import { UpdateUserInputDTO } from "./user.dto";
import { AccessDeniedError } from "../utils/error";
import { requireSession } from "../utils/requireSession";
import { Prisma, TaskStatus } from "@/generated/prisma/client";

export const getUser = cache(
  async <T extends Prisma.UserSelect>(id: string, select: T) => {
    const {
      user: { workspaceId },
    } = await requireSession();

    let where = { id, workspaceId };

    return prisma.user.findFirst({
      where,
      select,
    });
  },
);

export const getAllUsers = cache(
  async <T extends Prisma.UserSelect>({ select }: { select: T }) => {
    const {
      user: { workspaceId },
    } = await requireSession();

    let where = { workspaceId };

    return await prisma.user.findMany({
      where,
      select,
    });
  },
);

export const getPaginatedUsers = cache(
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
    } = await requireSession();

    const skip = page && pageSize ? (page - 1) * pageSize : Prisma.skip;
    const take = pageSize ? pageSize : Prisma.skip;

    const orderByMapping: Record<string, Prisma.UserOrderByWithRelationInput> =
      {
        fullName: { fullName: "asc" },
        position: { position: { name: "asc" } },
      };

    const orderBy = sort ? orderByMapping[sort] : Prisma.skip;
    const where = buildUserWhereClause(workspaceId, filters);

    const [items, totalCount] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy,
        skip,
        take,
        select,
      }),
      prisma.user.count({ where }),
    ]);

    return {
      items,
      totalCount,
    };
  },
);

export const getUserCount = cache(async (filters?: UserFilters) => {
  const {
    user: { workspaceId },
  } = await requireSession();

  return prisma.user.count({
    where: buildUserWhereClause(workspaceId, filters),
  });
});

export const updateUser = async (input: UpdateUserInputDTO) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: userId,
      permission: {
        user: ["update"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError("You do not have permission to update users.");
  }

  // Check related resources access
  await checkUserResourcesAccess(input.positionId);

  const updatedUser = await prisma.user.update({
    where: {
      id: input.id,
      workspaceId,
    },
    data: {
      fullName: input.fullName ?? Prisma.skip,
      bio: input.bio ?? Prisma.skip,
      positionId: input.positionId ?? Prisma.skip,
      phoneNumber: input.phoneNumber ?? Prisma.skip,
      publicLink: input.publicLink ?? Prisma.skip,
      birthdate: input.birthdate ?? Prisma.skip,
      address: input.address ?? Prisma.skip,
    },
  });

  return updatedUser;
};

export const deleteUsers = async (ids: string[]) => {
  const {
    user: { workspaceId },
  } = await requireSession();

  return await prisma.user.deleteMany({
    where: { workspaceId, id: { in: ids } },
  });
};

export async function checkUserResourcesAccess(positionId?: number) {
  const {
    user: { workspaceId },
  } = await requireSession();

  if (positionId) {
    const category = await prisma.position.findUnique({
      where: { id: positionId, workspaceId },
    });

    if (!category) {
      throw new AccessDeniedError("Position access denied or not found");
    }
  }
}

export function buildUserWhereClause(
  workspaceId: number,
  filters?: UserFilters,
): Prisma.UserWhereInput {
  const taskFilters: Prisma.UserWhereInput[] = [];

  if (filters?.hasNoActiveTasks) {
    taskFilters.push({
      assignedTasks: { none: { status: TaskStatus.active } },
    });
  }

  if (filters?.hasActiveTasks) {
    taskFilters.push({
      assignedTasks: { some: { status: TaskStatus.active } },
    });
  }

  if (filters?.hasOverdueTasks) {
    taskFilters.push({
      assignedTasks: {
        some: {
          status: { not: TaskStatus.completed },
          deadline: { lt: new Date() },
        },
      },
    });
  }

  return {
    workspaceId,
    ...(filters?.query && {
      OR: [
        { fullName: { contains: filters.query, mode: "insensitive" as const } },
      ],
    }),
    ...(filters?.position?.length && { positionId: { in: filters.position } }),
    ...(taskFilters.length > 0 && { OR: taskFilters }),
  };
}
