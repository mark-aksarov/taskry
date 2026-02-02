import { cache } from "react";
import prisma from "@/lib/prisma";
import { UserFilters } from "@/lib/types";
import { requireSession } from "../utils/requireSession";
import {
  NotificationType,
  Prisma,
  TaskStatus,
} from "@/generated/prisma/client";
import { AccessDeniedError } from "../utils/error";
import { CreateUserInputDTO } from "./user.dto";
import { auth } from "@/lib/auth";
import { getNotificationRecipients } from "../notification/notification.dal";

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

    const [items, totalCount] = await prisma.$transaction([
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

export const createUser = async (input: CreateUserInputDTO) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId,
      permission: {
        user: ["create"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError("You do not have permission to create user.");
  }

  // Check related resources access
  await checkUserResourcesAccess(workspaceId, input.positionId);

  return await prisma.$transaction(async (tx) => {
    const { user } = await auth.api.createUser({
      body: {
        email: input.email,
        password: input.password,
        name: input.fullName,
        role: "user",

        data: {
          workspaceId,
          positionId: input.positionId,
          bio: input.bio,
          birthdate: input.birthdate,
          phoneNumber: input.phoneNumber,
          address: input.address,
          publicLink: input.publicLink,
        },
      },
    });

    auth.api.sendVerificationEmail({ body: { email: input.email } });

    const recipients = await getNotificationRecipients(tx, workspaceId, userId);

    if (recipients.length > 0) {
      await tx.notification.createMany({
        data: recipients.map((recipient) => ({
          type: NotificationType.userAdded,
          actorId: userId,
          recipientId: recipient.id,
          workspaceId,
          userId: user.id,
          userFullName: user.name,
          isRead: false,
        })),
      });
    }

    return user;
  });
};

export const deleteUsers = async (ids: string[]) => {
  const {
    user: { workspaceId },
  } = await requireSession();

  return await prisma.user.deleteMany({
    where: { workspaceId, id: { in: ids } },
  });
};

/**
 * HELPERS
 */

async function checkUserResourcesAccess(
  workspaceId: number,
  positionId?: number,
) {
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
