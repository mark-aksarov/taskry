import "server-only";

import {
  Prisma,
  TaskStatus,
  ProjectStatus,
  NotificationType,
} from "@/generated/prisma/client";

import { cache } from "react";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ProjectFilters } from "@/lib/types";
import { AccessDeniedError } from "../utils/error";
import { requireSession } from "../utils/requireSession";
import { CreateProjectInputDTO, UpdateProjectInputDTO } from "./project.dto";
import { getNotificationRecipients } from "../notification/notification.dal";

export const getProject = cache(
  async <T extends Prisma.ProjectSelect>(id: number, select: T) => {
    const {
      user: { workspaceId },
    } = await requireSession();

    let where = { id, workspaceId };

    return prisma.project.findFirst({
      where,
      select,
    });
  },
);

export const getAllProjects = cache(
  async <T extends Prisma.ProjectSelect>({ select }: { select: T }) => {
    const {
      user: { workspaceId },
    } = await requireSession();

    let where = { workspaceId };

    return await prisma.project.findMany({
      where,
      select,
    });
  },
);

export const getPaginatedProjects = cache(
  async <T extends Prisma.ProjectSelect>({
    page,
    pageSize,
    sort,
    filters,
    select,
  }: {
    page?: number;
    pageSize?: number;
    sort?: string;
    filters?: ProjectFilters;
    select: T;
  }) => {
    const {
      user: { workspaceId },
    } = await requireSession();

    const skip = page && pageSize ? (page - 1) * pageSize : Prisma.skip;
    const take = pageSize ? pageSize : Prisma.skip;

    const orderByMapping: Record<
      string,
      Prisma.ProjectOrderByWithRelationInput
    > = {
      title: { title: "asc" },
      deadline: { deadline: "asc" },
      status: { status: "asc" },
      category: { category: { name: "asc" } },
    };

    const orderBy = sort ? orderByMapping[sort] : Prisma.skip;
    const where = buildProjectWhereClause(workspaceId, filters);

    const [items, totalCount] = await prisma.$transaction([
      prisma.project.findMany({
        where,
        orderBy,
        skip,
        take,
        select,
      }),
      prisma.project.count({ where }),
    ]);

    return {
      items,
      totalCount,
    };
  },
);

export const getProjectCount = cache(async (filters?: ProjectFilters) => {
  // Authorization
  const {
    user: { workspaceId },
  } = await requireSession();

  return prisma.project.count({
    where: buildProjectWhereClause(workspaceId, filters),
  });
});

export const createProject = async (input: CreateProjectInputDTO) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId,
      permission: {
        project: ["create"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to create project.",
    );
  }

  // Check related resources access
  await checkProjectResourcesAccess(
    workspaceId,
    input.categoryId,
    input.customerId,
  );

  return prisma.$transaction(async (tx) => {
    const project = await prisma.project.create({
      data: {
        title: input.title,
        description: input.description ?? Prisma.skip,
        deadline: input.deadline,
        customerId: input.customerId ?? Prisma.skip,
        categoryId: input.categoryId,
        status: input.status,
        creatorId: userId,
        workspaceId,
      },
    });

    const recipients = await getNotificationRecipients(tx, workspaceId, userId);

    if (recipients.length > 0) {
      await tx.notification.createMany({
        data: recipients.map((user) => ({
          type: NotificationType.projectAdded,
          actorId: userId,
          recipientId: user.id,
          workspaceId,
          projectId: project.id,
          projectTitle: project.title,
          isRead: false,
        })),
      });
    }

    return project;
  });
};

export const updateProject = async (input: UpdateProjectInputDTO) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId,
      permission: {
        project: ["update"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to update project.",
    );
  }

  // Check related resources access
  await checkProjectResourcesAccess(
    workspaceId,
    input.categoryId,
    input.customerId,
  );

  return await prisma.$transaction(async (tx) => {
    const updatedProject = await tx.project.update({
      where: {
        id: input.id,
        workspaceId,
      },
      data: {
        title: input.title ?? Prisma.skip,
        description: input.description ?? Prisma.skip,
        deadline: input.deadline ?? Prisma.skip,
        customerId: input.customerId ?? Prisma.skip,
        categoryId: input.categoryId ?? Prisma.skip,
        status: input.status ?? Prisma.skip,
      },
    });

    const recipients = await getNotificationRecipients(tx, workspaceId, userId);

    if (recipients.length > 0) {
      await tx.notification.createMany({
        data: recipients.map((user) => ({
          type: NotificationType.projectChanged,
          actorId: userId,
          recipientId: user.id,
          workspaceId,
          projectId: updatedProject.id,
          projectTitle: updatedProject.title,
          isRead: false,
        })),
      });
    }

    return updatedProject;
  });
};

export const updateProjectStatuses = async (
  ids: number[],
  status: ProjectStatus,
) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId,
      permission: {
        project: ["update"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to update project.",
    );
  }

  return await prisma.$transaction(async (tx) => {
    const updatedProjects = await tx.project.updateManyAndReturn({
      where: {
        id: { in: ids },
        workspaceId,
      },
      data: {
        status,
      },
    });

    if (updatedProjects.length === 0) {
      return [];
    }

    const recipients = await getNotificationRecipients(tx, workspaceId, userId);

    if (recipients.length > 0) {
      await tx.notification.createMany({
        data: updatedProjects.flatMap((project) =>
          recipients.map((user) => ({
            type: NotificationType.projectChanged,
            actorId: userId,
            recipientId: user.id,
            workspaceId,
            projectId: project.id,
            projectTitle: project.title,
            isRead: false,
          })),
        ),
      });
    }

    return updatedProjects;
  });
};

export const deleteProjects = async (ids: number[]) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: userId,
      permission: {
        project: ["delete"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError("You do not have permission to delete tasks.");
  }

  return await prisma.$transaction(async (tx) => {
    // Fetch projects before deletion for notifications
    const projectsToDelete = await tx.project.findMany({
      where: {
        workspaceId,
        id: {
          in: ids,
        },
      },
      select: {
        title: true,
      },
    });

    if (projectsToDelete.length === 0) {
      return {
        count: 0,
      };
    }

    // Bulk delete projects within the workspace
    const result = await tx.project.deleteMany({
      where: {
        workspaceId,
        id: { in: ids },
      },
    });

    const recipients = await getNotificationRecipients(tx, workspaceId, userId);

    if (recipients.length > 0) {
      await tx.notification.createMany({
        data: projectsToDelete.flatMap((project) =>
          recipients.map((user) => ({
            type: NotificationType.projectDeleted,
            actorId: userId,
            recipientId: user.id,
            workspaceId,
            projectTitle: project.title,
            isRead: false,
          })),
        ),
      });
    }

    return result;
  });
};

/**
 * HELPERS
 */

async function checkProjectResourcesAccess(
  workspaceId: number,
  categoryId?: number,
  customerId?: number,
) {
  if (categoryId) {
    const category = await prisma.projectCategory.findUnique({
      where: { id: categoryId, workspaceId },
    });

    if (!category) {
      throw new AccessDeniedError("Category access denied or not found");
    }
  }

  if (customerId) {
    const customer = await prisma.customer.findUnique({
      where: { id: customerId, workspaceId },
    });

    if (!customer) {
      throw new AccessDeniedError("Customer access denied or not found");
    }
  }
}

export function buildProjectWhereClause(
  workspaceId: number,
  filters?: ProjectFilters,
): Prisma.ProjectWhereInput {
  if (!filters) return { workspaceId };

  return {
    workspaceId,

    ...(filters.query && {
      OR: [
        { title: { contains: filters.query, mode: "insensitive" as const } },
      ],
    }),

    ...(filters.noActiveTasks && {
      status: ProjectStatus.active,
      tasks: { none: { status: TaskStatus.active } },
    }),
    ...(filters.status?.length && { status: { in: filters.status } }),
    ...(filters.category?.length && { categoryId: { in: filters.category } }),
    ...(filters.customer?.length && { customerId: { in: filters.customer } }),
    ...(filters.user?.length && { creatorId: { in: filters.user } }),
    deadline: {
      ...(filters.deadlineFrom && { gte: filters.deadlineFrom }),
      ...(filters.deadlineTo && { lte: filters.deadlineTo }),
    },
  };
}
