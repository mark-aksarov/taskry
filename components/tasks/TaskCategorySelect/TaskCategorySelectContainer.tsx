import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { TaskCategorySelect } from "./TaskCategorySelect";

export const getTaskCategories = cache(async (workspaceId: number) => {
  return prisma.taskCategory.findMany({
    where: { workspaceId },
  });
});

export async function TaskCategorySelectContainer() {
  const categories = await getTaskCategories(1);

  if (!categories.length) {
    return null;
  }

  return <TaskCategorySelect categories={categories} />;
}
