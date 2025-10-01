import "server-only";

import { cache } from "react";
import prisma from "../prisma";

export const PENDING_PROJECT_STATUS_ID = 1;
export const ACTIVE_PROJECT_STATUS_ID = 2;
export const COMPLETED_PROJECT_STATUS_ID = 3;

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
