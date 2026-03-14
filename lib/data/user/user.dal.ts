import {
  UserDetailDTO,
  UserSearchDTO,
  UserSummaryDTO,
  UserFormDataDTO,
  UserListDTO,
} from "./user.dto";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { UserFilters, UserSortField } from "@/lib/types";
import { requireSession } from "../utils/requireSession";
import { Prisma, TaskStatus } from "@/generated/prisma/client";

export const getUserDetail = cache(
  async (id: string): Promise<UserDetailDTO | null> => {
    const {
      user: { workspaceId },
    } = await requireSession();

    const user = await prisma.user.findFirst({
      where: { id, workspaceId },
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        imageUrl: true,
        publicLink: true,
        birthdate: true,
        bio: true,
        address: true,

        position: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber ?? undefined,
      imageUrl: user.imageUrl ?? undefined,
      publicLink: user.publicLink ?? undefined,
      birthdate: user.birthdate?.toISOString() ?? undefined,
      bio: user.bio ?? undefined,
      address: user.address ?? undefined,
      position: user.position ? user.position : undefined,
    };
  },
);

export const getUserFormData = cache(
  async (id: string): Promise<UserFormDataDTO | null> => {
    const {
      user: { workspaceId },
    } = await requireSession();

    const user = await prisma.user.findFirst({
      where: { id, workspaceId },
      select: {
        id: true,
        fullName: true,
        phoneNumber: true,
        imageUrl: true,
        publicLink: true,
        birthdate: true,
        bio: true,
        address: true,
        positionId: true,
      },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber ?? undefined,
      imageUrl: user.imageUrl ?? undefined,
      publicLink: user.publicLink ?? undefined,
      birthdate: user.birthdate?.toISOString() ?? undefined,
      bio: user.bio ?? undefined,
      address: user.address ?? undefined,
      positionId: user.positionId ?? undefined,
    };
  },
);

export const getUserSummary = cache(
  async (id: string): Promise<UserSummaryDTO | null> => {
    // Authorization
    const {
      user: { workspaceId },
    } = await requireSession();

    const user = await prisma.user.findFirst({
      where: { id, workspaceId },
      select: {
        id: true,
        fullName: true,
      },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      fullName: user.fullName,
    };
  },
);

export const getUserSummaries = cache(async (): Promise<UserSummaryDTO[]> => {
  const {
    user: { workspaceId },
  } = await requireSession();

  let where = { workspaceId };

  const users = await prisma.user.findMany({
    where,
    select: {
      id: true,
      fullName: true,
    },
  });

  return users.map((u) => ({
    id: u.id,
    fullName: u.fullName,
  }));
});

export const searchUsers = cache(
  async ({
    query,
    page,
    pageSize,
  }: {
    query?: string;
    page?: number;
    pageSize?: number;
  }): Promise<UserSearchDTO> => {
    // Authorization
    const {
      user: { workspaceId },
    } = await requireSession();

    // Get users
    const where = {
      workspaceId,
      fullName: { contains: query, mode: "insensitive" as const },
    };

    const [items, totalCount] = await Promise.all([
      prisma.user.findMany({
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
      prisma.user.count({ where }),
    ]);

    //Map to DTO
    return {
      items: items.map((p) => ({
        id: p.id,
        fullName: p.fullName,
        email: p.email,
        imageUrl: p.imageUrl ?? undefined,
      })),

      totalCount,
    };
  },
);

export const getUserList = cache(
  async ({
    page,
    pageSize,
    sort,
    filters,
  }: {
    page?: number;
    pageSize?: number;
    sort?: UserSortField;
    filters?: UserFilters;
  }): Promise<UserListDTO> => {
    const {
      user: { workspaceId },
    } = await requireSession();

    // Sorting
    let orderBy;

    if (sort === "position") {
      orderBy = [
        {
          position: {
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

    const where = buildUserWhereClause(workspaceId, filters);

    const [items, totalCount] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy,
        skip: page && pageSize ? (page - 1) * pageSize : undefined,
        take: pageSize,
        select: {
          id: true,
          fullName: true,
          email: true,
          phoneNumber: true,
          imageUrl: true,
          publicLink: true,

          position: {
            select: {
              name: true,
            },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      items: items.map((u) => ({
        id: u.id,
        fullName: u.fullName,
        email: u.email,
        phoneNumber: u.phoneNumber ?? undefined,
        imageUrl: u.imageUrl ?? undefined,
        publicLink: u.publicLink ?? undefined,
        position: u.position ?? undefined,
      })),

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
      fullName: { contains: filters.query, mode: "insensitive" as const },
    }),
    ...(filters?.position?.length && { positionId: { in: filters.position } }),
    ...(taskFilters.length > 0 && { OR: taskFilters }),
  };
}
