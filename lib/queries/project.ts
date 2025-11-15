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
          nameEn: true,
          nameRu: true,
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

export type GetProjectsType = ThenArg<ReturnType<typeof getProjects>>;
export const getProjects = cache(async (creatorId?: string) => {
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
