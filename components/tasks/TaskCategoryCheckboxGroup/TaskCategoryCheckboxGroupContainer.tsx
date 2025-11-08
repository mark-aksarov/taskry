import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { TaskCategoryCheckboxGroup } from "./TaskCategoryCheckboxGroup";

export const getTaskCategories = cache(async (workspaceId: number) => {
  return prisma.taskCategory.findMany({
    where: { workspaceId },
  });
});

export async function TaskCategoryCheckboxGroupContainer() {
  const categories = await getTaskCategories(1);

  if (!categories.length) {
    return null;
  }

  return <TaskCategoryCheckboxGroup categories={categories} />;
}
