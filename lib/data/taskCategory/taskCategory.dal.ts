import { cache } from "react";
import prisma from "@/lib/prisma";
import { CreateTaskCategoryInputDTO } from "./taskCategory.dto";
import { mapTaskCategorySummaryToDTO } from "./taskCategory.mapper";
import { getSessionOrThrow } from "@/lib/data/utils/getSessionOrThrow";

export const getTaskCategorySummaries = cache(async () => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  const categories = await prisma.taskCategory.findMany({
    where: { workspaceId },
    select: { id: true, name: true },
  });

  return categories.map(mapTaskCategorySummaryToDTO);
});

export const createTaskCategory = async (
  taskCategory: CreateTaskCategoryInputDTO,
) => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  return await prisma.taskCategory.create({
    data: {
      ...taskCategory,
      workspaceId,
    },
  });
};
