"server only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { NewProjectForm } from "./NewProjectForm";
import { NewProjectFormStatusSelect } from "./NewProjectFormStatusSelect";
import { NewProjectFormCategorySelect } from "./NewProjectFormCategorySelect";

export const getProjectCategories = cache(async (workspaceId: number) => {
  return await prisma.projectCategory.findMany({
    where: { workspaceId },
    select: { id: true, name: true },
  });
});

export const getProjectStatuses = cache(async () => {
  return await prisma.projectStatus.findMany({
    select: { id: true, nameEn: true },
  });
});

export async function NewProjectFormContainer() {
  const categories = await getProjectCategories(1);
  const statuses = await getProjectStatuses();

  return (
    <NewProjectForm
      projectCategorySelect={
        <NewProjectFormCategorySelect categories={categories} />
      }
      projectStatusSelect={
        <NewProjectFormStatusSelect
          statuses={statuses.map((s) => ({ id: s.id, name: s.nameEn }))}
        />
      }
    />
  );
}
