import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { ProjectPreview } from "./types";
import { ACTIVE_PROJECT_STATUS_ID } from "./constants";

export const getProjects = cache(async (): Promise<ProjectPreview[]> => {
  return await prisma.project.findMany({
    include: {
      creator: {
        select: {
          name: true,
          imageUrl: true,
        },
      },
      status: {
        select: {
          id: true,
          nameEn: true,
          nameRu: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
      customer: {
        select: {
          fullName: true,
          company: {
            select: {
              name: true,
            },
          },
        },
      },
      tasks: {
        select: {
          statusId: true,
        },
      },
    },
    take: 10,
  });
});

export const getTotalProjects = cache(
  async (fromDate?: Date, toDate?: Date) => {
    const where: any = {};

    if (fromDate && toDate) {
      where.deadline = {
        gte: fromDate,
        lte: toDate,
      };
    }

    return prisma.project.count({ where });
  },
);

export const getActiveProjects = cache(async () => {
  return prisma.project.count({
    where: { statusId: ACTIVE_PROJECT_STATUS_ID },
  });
});

export const getProjectCategories = cache(async (workspaceId: number) => {
  return prisma.projectCategory.findMany({
    where: { workspaceId },
  });
});

export const getProjectStatuses = cache(async () => {
  return prisma.projectStatus.findMany();
});
