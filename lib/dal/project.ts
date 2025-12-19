import "server-only";

import {
  mapProjectDetailToDTO,
  mapProjectSummaryToDTO,
  mapProjectListItemToDTO,
  mapProjectCategorySummaryToDTO,
  mapProjectFormDataToDTO,
} from "../mappers/project";

import { cache } from "react";
import prisma from "../prisma";
import { ProjectFiltersType } from "../types/projects";
import { ProjectStatus } from "@/generated/prisma/client";
import { getSessionOrThrow } from "../utils/getSessionOrThrow";
import { CreateProjectInputDTO, UpdateProjectInputDTO } from "../dto/project";

export const getProjectSummary = cache(async (id: number) => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  const projectSummary = await prisma.project.findFirst({
    where: { id, workspaceId },
    select: {
      id: true,
      title: true,
    },
  });

  if (!projectSummary) throw new Error("Not Found");

  return mapProjectSummaryToDTO(projectSummary);
});

export const getProjectFormData = cache(async (id: number) => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  const project = await prisma.project.findFirst({
    where: { id, workspaceId },
    select: {
      id: true,
      title: true,
      description: true,
      deadline: true,
      status: true,
      categoryId: true,
      customerId: true,
    },
  });

  if (!project) throw new Error("Project not found");

  return mapProjectFormDataToDTO(project);
});

export const getProjectDetail = cache(async (id: number) => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  const projectDetail = await prisma.project.findFirst({
    where: { id, workspaceId },
    select: {
      id: true,
      title: true,
      description: true,
      deadline: true,

      creator: {
        select: {
          id: true,
          fullName: true,
          imageUrl: true,
        },
      },
      status: true,
      customer: {
        select: {
          id: true,
          fullName: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      attachments: {
        select: {
          id: true,
          fileUrl: true,
          fileName: true,
        },
      },
    },
  });

  if (!projectDetail) throw new Error("Not Found");

  return mapProjectDetailToDTO(projectDetail);
});

export const getProjectList = cache(
  async ({
    page,
    pageSize,
    sort,
    filters,
  }: {
    page: number;
    pageSize: number;
    sort: string;
    filters?: ProjectFiltersType;
  }) => {
    const session = await getSessionOrThrow();
    const workspaceId = session.user.workspaceId;
    const skip = (page - 1) * pageSize;

    const where = buildProjectWhereClause(workspaceId, filters);

    const orderByMapping: Record<string, any> = {
      title: { title: "asc" },
      deadline: { deadline: "asc" },
      status: { status: "asc" },
      category: { category: { name: "asc" } },
    };

    const orderBy = orderByMapping[sort] || { title: "asc" };

    const projects = await prisma.project.findMany({
      where, // Use shared clause
      orderBy: [orderBy],
      skip,
      take: pageSize,
      select: {
        id: true,
        title: true,
        deadline: true,
        creator: { select: { id: true, fullName: true, imageUrl: true } },
        status: true,
        category: { select: { id: true, name: true } },
        customer: {
          select: {
            id: true,
            fullName: true,
            imageUrl: true,
            company: { select: { id: true, name: true } },
          },
        },
        _count: { select: { comments: true } },
        tasks: { select: { status: true } },
      },
    });

    return projects.map((project) => mapProjectListItemToDTO(project));
  },
);

export const getProjectCount = cache(async (filters?: ProjectFiltersType) => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  return prisma.project.count({
    where: buildProjectWhereClause(workspaceId, filters), // Use shared clause
  });
});

function buildProjectWhereClause(
  workspaceId: number,
  filters?: ProjectFiltersType,
) {
  // 1. Destructure the new range filters
  const {
    status,
    category,
    customer,
    user,
    deadline,
    dateStart,
    dateEnd,
    noActiveTasks,
  } = filters ?? {};

  const now = new Date();
  const getStartOfDay = (date: Date) =>
    new Date(new Date(date).setHours(0, 0, 0, 0));
  const getEndOfDay = (date: Date) =>
    new Date(new Date(date).setHours(23, 59, 59, 999));

  return {
    workspaceId,
    ...(status && {
      status: { in: status.split(",") as ProjectStatus[] },
    }),
    ...(category && {
      categoryId: { in: category.split(",").map(Number) },
    }),
    ...(customer && {
      customerId: { in: customer.split(",").map(Number) },
    }),
    ...(user && {
      creatorId: { in: user.split(",") },
    }),

    // --- No Active Tasks Logic ---
    ...(noActiveTasks && {
      tasks: {
        // Returns projects where NONE of the tasks are "Active"
        // Adjust "Active" to match your actual Task status enum/string
        none: {
          status: ProjectStatus.active,
        },
      },
    }),

    // --- Combined Deadline Logic ---
    ...(deadline
      ? {
          // Logic for Quick Select Checkboxes (Today, Tomorrow, etc.)
          OR: deadline.split(",").map((d) => {
            if (d === "today") {
              return {
                deadline: {
                  gte: getStartOfDay(new Date()),
                  lte: getEndOfDay(new Date()),
                },
              };
            }
            if (d === "tomorrow") {
              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              return {
                deadline: {
                  gte: getStartOfDay(tomorrow),
                  lte: getEndOfDay(tomorrow),
                },
              };
            }
            if (d === "thisWeek") {
              const endOfWeek = new Date();
              const day = endOfWeek.getDay();
              const diff = day === 0 ? 0 : 7 - day;
              endOfWeek.setDate(endOfWeek.getDate() + diff);
              return {
                deadline: {
                  gte: getStartOfDay(new Date()),
                  lte: getEndOfDay(endOfWeek),
                },
              };
            }
            if (d === "overdue") {
              return {
                deadline: { lt: now },
              };
            }
            return {};
          }),
        }
      : dateStart || dateEnd
        ? {
            // Logic for Custom Date Range
            deadline: {
              ...(dateStart && { gte: getStartOfDay(new Date(dateStart)) }),
              ...(dateEnd && { lte: getEndOfDay(new Date(dateEnd)) }),
            },
          }
        : {}),
  };
}

export const getProjectSummaries = cache(async () => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  const projects = await prisma.project.findMany({
    where: { workspaceId },
    select: { id: true, title: true },
  });

  return projects.map((project) => mapProjectSummaryToDTO(project));
});

export const getProjectCategorySummaries = cache(async () => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  const categories = await prisma.projectCategory.findMany({
    where: { workspaceId },
    select: { id: true, name: true },
  });

  return categories.map((category) => mapProjectCategorySummaryToDTO(category));
});

export const createProject = async (project: CreateProjectInputDTO) => {
  const session = await getSessionOrThrow();
  const creatorId = session.user.id;
  const workspaceId = session.user.workspaceId;

  const category = await prisma.projectCategory.findFirst({
    where: {
      id: project.categoryId,
      workspaceId: workspaceId,
    },
  });

  if (!category) {
    throw new Error("Invalid category");
  }

  if (project.customerId) {
    const customer = await prisma.customer.findFirst({
      where: {
        id: project.customerId,
        workspaceId: workspaceId,
      },
    });

    if (!customer) {
      throw new Error("Invalid customer");
    }
  }

  return await prisma.project.create({
    data: {
      ...project,
      creatorId,
      workspaceId,
    },
  });
};

export const updateProject = async (project: UpdateProjectInputDTO) => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  const category = await prisma.projectCategory.findFirst({
    where: {
      id: project.categoryId,
      workspaceId: workspaceId,
    },
  });

  if (!category) {
    throw new Error("Invalid category");
  }

  if (project.customerId) {
    const customer = await prisma.customer.findFirst({
      where: {
        id: project.customerId,
        workspaceId: workspaceId,
      },
    });

    if (!customer) {
      throw new Error("Invalid customer");
    }
  }

  return await prisma.project.update({
    where: {
      id: project.id,
      workspaceId,
    },
    data: project,
  });
};

export const deleteProjects = async (ids: number[]) => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  const { count } = await prisma.project.deleteMany({
    where: {
      workspaceId,
      id: { in: ids },
    },
  });

  if (count === 0) throw new Error("No projects deleted.");

  return count;
};

export const updateProjectStatus = async (
  projectId: number,
  nextStatus: ProjectStatus,
) => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  return await prisma.$transaction(async (tx) => {
    // Get project with workspace check
    const project = await tx.project.findFirst({
      where: {
        id: projectId,
        workspaceId,
      },
      select: {
        id: true,
        status: true,
      },
    });

    if (!project) {
      throw new Error("Project not found");
    }

    // No-op if status is the same
    if (project.status === nextStatus) {
      return project;
    }

    // Update project status
    const updatedProject = await tx.project.update({
      where: { id: projectId },
      data: { status: nextStatus },
    });

    // If project was completed, do not touch tasks
    if (project.status === "completed") {
      return updatedProject;
    }

    // Project -> completed
    if (nextStatus === "completed") {
      await tx.task.updateMany({
        where: { projectId },
        data: { status: "completed" },
      });

      return updatedProject;
    }

    // pending -> active
    if (nextStatus === "active") {
      await tx.task.updateMany({
        where: {
          projectId,
          status: "pending",
        },
        data: { status: "active" },
      });

      return updatedProject;
    }

    // active -> pending
    if (project.status === "active" && nextStatus === "pending") {
      await tx.task.updateMany({
        where: {
          projectId,
          status: "active",
        },
        data: { status: "pending" },
      });
    }

    return updatedProject;
  });
};

export const bulkUpdateProjectStatuses = async (
  projectIds: number[],
  nextStatus: ProjectStatus,
) => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  // Transaction ensures that project and task updates are atomic
  return await prisma.$transaction(async (tx) => {
    // 1. Update all accessible projects at once
    await tx.project.updateMany({
      where: {
        id: { in: projectIds },
        workspaceId,
      },
      data: { status: nextStatus },
    });

    // 2. Bulk update tasks based on the target project status

    // If project is completed, force all its tasks to completed
    if (nextStatus === "completed") {
      await tx.task.updateMany({
        where: { projectId: { in: projectIds } },
        data: { status: "completed" },
      });
    }

    // If project becomes active, activate only pending tasks
    if (nextStatus === "active") {
      await tx.task.updateMany({
        where: {
          projectId: { in: projectIds },
          status: "pending",
        },
        data: { status: "active" },
      });
    }

    // If project becomes pending, revert only active tasks
    if (nextStatus === "pending") {
      await tx.task.updateMany({
        where: {
          projectId: { in: projectIds },
          status: "active",
        },
        data: { status: "pending" },
      });
    }

    return projectIds;
  });
};
