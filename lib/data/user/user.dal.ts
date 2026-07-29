import {
  UserDTO,
  UserListDTO,
  UserDetailDTO,
  UserSummaryDTO,
  UpdateUserInputDTO,
} from "./user.dto";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { AccessDeniedError } from "../utils/error";
import { validatePositions } from "../utils/validation";
import { UserFilters, UserSortField } from "@/lib/types";
import { requireOrganizationAccess } from "../utils/requireOrganizationAccess";
import { Prisma, TaskStatus, User } from "@/generated/prisma/client";

export const getUserDetail = cache(
  async (id: string): Promise<UserDetailDTO | null> => {
    const {
      session: { activeOrganizationId: organizationId },
    } = await requireOrganizationAccess();

    const member = await prisma.member.findFirst({
      where: {
        userId: id,
        organizationId,
      },
      select: {
        user: {
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
        },
      },
    });

    const user = member?.user;

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

export const getUser = cache(async (id: string): Promise<UserDTO | null> => {
  const {
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  const member = await prisma.member.findFirst({
    where: { userId: id, organizationId },
    select: {
      user: {
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
      },
    },
  });

  const user = member?.user;

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
});

export const getUsers = cache(async (): Promise<UserDTO[]> => {
  const {
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  const members = await prisma.member.findMany({
    where: { organizationId },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      user: {
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
      },
    },
  });

  return members.map((m) => {
    const user = m.user;

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
  });
});

export const getUserSummary = cache(
  async (id: string): Promise<UserSummaryDTO | null> => {
    // Authorization
    const {
      session: { activeOrganizationId: organizationId },
    } = await requireOrganizationAccess();

    const member = await prisma.member.findFirst({
      where: { userId: id, organizationId },
      select: {
        user: {
          select: {
            id: true,
            fullName: true,
          },
        },
      },
    });

    const user = member?.user;

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
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  const members = await prisma.member.findMany({
    where: { organizationId },
    select: {
      user: {
        select: {
          id: true,
          fullName: true,
        },
      },
    },
  });

  return members.map(({ user }) => ({
    id: user.id,
    fullName: user.fullName,
  }));
});

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
      session: { activeOrganizationId: organizationId },
    } = await requireOrganizationAccess();

    // Sorting
    let orderBy:
      | Prisma.MemberOrderByWithRelationInput
      | Prisma.MemberOrderByWithRelationInput[]
      | undefined;

    if (sort === "position") {
      orderBy = [
        {
          user: {
            position: {
              name: "asc",
            },
          },
        },
        {
          user: {
            fullName: "asc",
          },
        },
      ];
    } else if (sort === "fullName") {
      orderBy = {
        user: {
          fullName: "asc",
        },
      };
    }

    const where = buildMemberWhereClause(organizationId, filters);

    const [members, totalCount] = await Promise.all([
      prisma.member.findMany({
        where,
        orderBy,
        skip: page && pageSize ? (page - 1) * pageSize : undefined,
        take: pageSize,
        select: {
          user: {
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
          },
        },
      }),

      prisma.member.count({
        where,
      }),
    ]);

    return {
      items: members.map(({ user }) => ({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber ?? undefined,
        imageUrl: user.imageUrl ?? undefined,
        publicLink: user.publicLink ?? undefined,
        position: user.position ?? undefined,
      })),

      totalCount,
    };
  },
);

export const getUserCount = cache(async (filters?: UserFilters) => {
  const {
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  return prisma.member.count({
    where: buildMemberWhereClause(organizationId, filters),
  });
});

export const updateUser = async (input: UpdateUserInputDTO) => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  // Check permission
  const permissions = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        user: ["update"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError("You do not have permission to update user.");
  }

  // Validate position
  if (input.positionId) {
    await validatePositions(organizationId, [input.positionId]);
  }

  // Update user
  const updatedUser = await prisma.user.update({
    where: {
      members: {
        some: {
          organizationId,
        },
      },
      id: input.id,
    },
    data: {
      fullName: input.fullName,
      imageUrl: input.imageUrl,
      phoneNumber: input.phoneNumber,
      publicLink: input.publicLink,
      positionId: input.positionId,
      bio: input.bio,
      address: input.address,
      birthdate: input.birthdate ? new Date(input.birthdate) : undefined,
    },
  });

  return mapToUserDTO(updatedUser);
};

export const deleteUser = async (id: string) => {
  const {
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  // Check permission
  const permissions = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        user: ["delete"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError("You do not have permission to delete users.");
  }

  // Delete user
  const result = await prisma.user.delete({
    where: {
      members: {
        some: {
          organizationId,
        },
      },
      id,
    },
  });

  return result;
};

/**
 * Helpers
 */

function buildMemberWhereClause(
  organizationId: string,
  filters?: UserFilters,
): Prisma.MemberWhereInput {
  const userFilters: Prisma.UserWhereInput[] = [];

  if (filters?.hasNoActiveTasks) {
    userFilters.push({
      assignedTasks: {
        none: {
          status: TaskStatus.active,
        },
      },
    });
  }

  if (filters?.hasActiveTasks) {
    userFilters.push({
      assignedTasks: {
        some: {
          status: TaskStatus.active,
        },
      },
    });
  }

  if (filters?.hasOverdueTasks) {
    userFilters.push({
      assignedTasks: {
        some: {
          status: { not: TaskStatus.completed },
          deadline: {
            lt: new Date(),
          },
        },
      },
    });
  }

  return {
    organizationId,

    user: {
      ...(filters?.query && {
        fullName: {
          contains: filters.query,
          mode: "insensitive",
        },
      }),

      ...(filters?.positionIds?.length && {
        positionId: {
          in: filters.positionIds,
        },
      }),

      ...(userFilters.length > 0 && {
        OR: userFilters,
      }),
    },
  };
}

function mapToUserDTO(
  user: Pick<
    User,
    | "id"
    | "fullName"
    | "bio"
    | "imageUrl"
    | "phoneNumber"
    | "address"
    | "publicLink"
    | "birthdate"
    | "positionId"
  >,
): UserDTO {
  return {
    id: user.id,
    fullName: user.fullName,
    bio: user.bio ?? undefined,
    imageUrl: user.imageUrl ?? undefined,
    phoneNumber: user.phoneNumber ?? undefined,
    address: user.address ?? undefined,
    publicLink: user.publicLink ?? undefined,
    birthdate: user.birthdate?.toISOString(),
    positionId: user.positionId ?? undefined,
  };
}
