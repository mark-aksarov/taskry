import "server-only";

import {
  CreateProjectInputDTO,
  UpdateProjectInputDTO,
  CreateProjectCategoryInputDTO,
} from "../dto/project";

import {
  mapProjectDetailToDTO,
  mapProjectSummaryToDTO,
  mapProjectListItemToDTO,
  mapProjectCategorySummaryToDTO,
  mapProjectFormDataToDTO,
} from "../mappers/project";

import { cache } from "react";
import prisma from "../prisma";
import { getSessionOrThrow } from "../utils/getSessionOrThrow";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/client";
import { TRANSITION_TASK_STATUSES_BY_PROJECT } from "../utils/statusUtils";
import { ProjectFilters } from "../dto/filters/projectFilters";
import { buildDateWhere } from "../utils/dateWhere";

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
    filters?: ProjectFilters;
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

    const projects = await prisma.project.findMany({
      where,
      orderBy: [orderByMapping[sort] || { title: "asc" }],
      skip,
      take: pageSize,
      select: {
        id: true,
        title: true,
        deadline: true,
        creator: {
          select: {
            id: true,
            fullName: true,
            imageUrl: true,
          },
        },
        status: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        customer: {
          select: {
            id: true,
            fullName: true,
            imageUrl: true,
            company: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
        tasks: {
          select: {
            status: true,
          },
        },
      },
    });

    return projects.map((project) => mapProjectListItemToDTO(project));
  },
);

export const getProjectCount = cache(async (filters?: ProjectFilters) => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  return prisma.project.count({
    where: buildProjectWhereClause(workspaceId, filters), // Use shared clause
  });
});

export function buildProjectWhereClause(
  workspaceId: number,
  filters?: ProjectFilters,
) {
  if (!filters) {
    return { workspaceId };
  }

  const {
    status,
    category,
    customer,
    user,
    deadline,
    dateStart,
    dateEnd,
    noActiveTasks,
  } = filters;

  const datesWhere = buildDateWhere({
    quick: deadline as any,
    dateStart,
    dateEnd,
  });

  return {
    workspaceId,

    ...(noActiveTasks && {
      tasks: {
        none: {
          status: ProjectStatus.active,
        },
      },
    }),

    ...(status.length && { status: { in: status } }),
    ...(category.length && { categoryId: { in: category } }),
    ...(customer.length && { customerId: { in: customer } }),
    ...(user.length && { creatorId: { in: user } }),

    ...(datesWhere && { deadline: datesWhere }),
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

export const updateProjectStatuses = async (
  projectIds: number[],
  nextStatus: ProjectStatus,
) => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  return await prisma.$transaction(async (tx) => {
    await tx.project.updateMany({
      where: { id: { in: projectIds }, workspaceId },
      data: { status: nextStatus },
    });

    const taskRules = TRANSITION_TASK_STATUSES_BY_PROJECT[nextStatus];

    for (const [currentStatus, newStatus] of Object.entries(taskRules)) {
      if (currentStatus === newStatus) continue;

      await tx.task.updateMany({
        where: {
          projectId: { in: projectIds },
          status: currentStatus as TaskStatus,
        },
        data: { status: newStatus },
      });
    }

    return projectIds;
  });
};

export const createProjectCategory = async (
  projectCategory: CreateProjectCategoryInputDTO,
) => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  return await prisma.projectCategory.create({
    data: {
      ...projectCategory,
      workspaceId,
    },
  });
};
