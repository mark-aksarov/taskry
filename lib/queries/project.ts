import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { ThenArg } from "./types";

export type GetProjectDetailType = ThenArg<ReturnType<typeof getProjectDetail>>;
export const getProjectDetail = cache(async (id: number) => {
  return await prisma.project.findUniqueOrThrow({
    where: { id },
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
      status: {
        select: {
          id: true,
          name: true,
        },
      },
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
});

export type GetProjectSummaryType = ThenArg<
  ReturnType<typeof getProjectSummary>
>;
export const getProjectSummary = cache(async (id: number) => {
  return await prisma.project.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      title: true,
    },
  });
});

export type GetProjectListType = ThenArg<ReturnType<typeof getProjectList>>;
export const getProjectList = cache(async (creatorId?: string) => {
  return await prisma.project.findMany({
    where: creatorId
      ? {
          creatorId,
        }
      : undefined,
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
      status: {
        select: {
          id: true,
          name: true,
        },
      },
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
          statusId: true,
        },
      },
    },
  });
});

export type GetProjectSummariesType = ThenArg<
  ReturnType<typeof getProjectSummaries>
>;
export const getProjectSummaries = cache(async (workspaceId: number) => {
  return await prisma.project.findMany({
    where: { creator: { position: { workspaceId } } },
    select: { id: true, title: true },
  });
});

export type GetProjectSummarySummariesType = ThenArg<
  ReturnType<typeof getProjectSummarySummaries>
>;
export const getProjectSummarySummaries = cache(async () => {
  return await prisma.projectStatus.findMany({
    select: { id: true, name: true },
  });
});

export type GetProjectCategorySummariesType = ThenArg<
  ReturnType<typeof getProjectCategorySummaries>
>;
export const getProjectCategorySummaries = cache(
  async (workspaceId: number) => {
    return await prisma.projectCategory.findMany({
      where: { workspaceId },
      select: { id: true, name: true },
    });
  },
);

export type GetProjectStatusSummariesType = ThenArg<
  ReturnType<typeof getProjectStatusSummaries>
>;
export const getProjectStatusSummaries = cache(async () => {
  return await prisma.projectStatus.findMany({
    select: { id: true, name: true },
  });
});
