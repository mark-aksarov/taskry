import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { ProjectCategoryCheckboxGroup } from "./ProjectCategoryCheckboxGroup";

const getProjectCategories = cache(async (workspaceId: number) => {
  return await prisma.projectCategory.findMany({
    where: { workspaceId },
    select: { id: true, name: true },
  });
});

export async function ProjectCategoryCheckboxGroupContainer() {
  const categories = await getProjectCategories(1);

  if (!categories.length) {
    return null;
  }

  return <ProjectCategoryCheckboxGroup categories={categories} />;
}
