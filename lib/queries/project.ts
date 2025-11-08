import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { ProjectItem } from "@/components/projects/types";

export const getProjects = cache(
  async (creatorId?: string): Promise<ProjectItem[]> => {
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
            nameEn: true,
            nameRu: true,
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
    });
  },
);
