import { cache } from "react";
import prisma from "@/lib/prisma";
import { getSessionOrThrow } from "@/lib/data/utils/getSessionOrThrow";
import { CreateProjectCategoryInputDTO } from "./projectCategory.dto";
import { mapProjectCategorySummaryToDTO } from "./projectCategory.mapper";

export const getProjectCategorySummaries = cache(async () => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  const categories = await prisma.projectCategory.findMany({
    where: { workspaceId },
    select: { id: true, name: true },
  });

  return categories.map((category) => mapProjectCategorySummaryToDTO(category));
});

export const createProjectCategory = async (
  projectCategory: CreateProjectCategoryInputDTO,
) => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  return await prisma.projectCategory.create({
    data: {
      ...projectCategory,
      workspaceId,
    },
  });
};
