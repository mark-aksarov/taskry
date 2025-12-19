import "server-only";

import {
  mapProjectDetailToDTO,
  mapProjectSummaryToDTO,
  mapProjectListItemToDTO,
  mapProjectCategorySummaryToDTO,
} from "../mappers/project";

import { cache } from "react";
import prisma from "../prisma";
import { ProjectStatus } from "@/generated/prisma/client";
import { getSessionOrThrow } from "../utils/getSessionOrThrow";

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
  }: {
    page: number;
    pageSize: number;
    sort: string;
  }) => {
    const session = await getSessionOrThrow();
    const workspaceId = session.user.workspaceId;
    const skip = (page - 1) * pageSize;

    const orderByMapping: Record<string, any> = {
      title: { title: "asc" },
      deadline: { deadline: "asc" },
      status: { status: "asc" },
      category: { category: { name: "asc" } },
    };

    const orderBy = orderByMapping[sort] || { title: "asc" };

    const projects = await prisma.project.findMany({
      where: {
        workspaceId,
      },

      orderBy: [orderBy],
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

export const getProjectCount = cache(async () => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  return prisma.project.count({
    where: {
      workspaceId,
    },
  });
});

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
