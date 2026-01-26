import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { verifySession } from "../utils/verifySession";
import { CreateTaskCategoryInputDTO } from "./taskCategory.dto";

export const getAllTaskCategories = cache(async () => {
  const {
    user: { workspaceId },
  } = await verifySession();

  return await prisma.taskCategory.findMany({
    where: { workspaceId },
    select: { id: true, name: true },
  });
});

export const createTaskCategory = async (
  taskCategory: CreateTaskCategoryInputDTO,
) => {
  const {
    user: { workspaceId },
  } = await verifySession();

  return await prisma.taskCategory.create({
    data: {
      ...taskCategory,
      workspaceId,
    },
  });
};
