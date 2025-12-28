"server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { verifySession } from "../utils/verifySession";
import { CreateProjectCategoryInputDTO } from "./projectCategory.dto";

export const getAllProjectCategories = cache(async () => {
  const {
    user: { workspaceId },
  } = await verifySession();

  return await prisma.projectCategory.findMany({
    where: { workspaceId },
    select: { id: true, name: true },
  });
});

export const createProjectCategory = async (
  projectCategory: CreateProjectCategoryInputDTO,
) => {
  const {
    user: { workspaceId },
  } = await verifySession();

  return await prisma.projectCategory.create({
    data: {
      ...projectCategory,
      workspaceId,
    },
  });
};
