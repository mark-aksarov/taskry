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

  const projectSummary = await prisma.project.findUniqueOrThrow({
    where: { id, workspaceId },
    select: {
      id: true,
      title: true,
    },
  });

  return mapProjectSummaryToDTO(projectSummary);
});

export const getProjectDetail = cache(async (id: number) => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  const projectDetail = await prisma.project.findUniqueOrThrow({
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

  return mapProjectDetailToDTO(projectDetail);
});

function getProjectWhereClause(params: { workspaceId: number }) {
  const { workspaceId } = params;

  return {
    category: {
      workspaceId,
    },
  };
}

export const getProjectList = cache(
  async ({ page, pageSize }: { page: number; pageSize: number }) => {
    const session = await getSessionOrThrow();
    const workspaceId = session.user.workspaceId;
    const where = getProjectWhereClause({ workspaceId });
    const skip = (page - 1) * pageSize;

    const projects = await prisma.project.findMany({
      where,
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
  const where = getProjectWhereClause({ workspaceId });

  return prisma.project.count({ where });
});

export const getProjectSummaries = cache(async () => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  const projects = await prisma.project.findMany({
    where: { creator: { position: { workspaceId } } },
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

export const deleteProject = async (id: number) => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  return await prisma.project.delete({
    where: { id, workspaceId },
  });
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
    if (project.status === "pending" && nextStatus === "active") {
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
