import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { ThenArg } from "./types";

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
