import "server-only";

import { Suspense } from "react";
import { CreateProjectForm } from "../CreateProjectForm";
import { ProjectFormSkeleton } from "../ProjectFormSkeleton";
import { getClientSummaries } from "@/lib/data/client/client.dal";
import { getProjectCategories } from "@/lib/data/projectCategory/projectCategory.dal";

export function CreateProjectFormContainer() {
  return (
    <Suspense fallback={<ProjectFormSkeleton />}>
      <CreateProjectFormContainerInner />
    </Suspense>
  );
}

async function CreateProjectFormContainerInner() {
  const categories = await getProjectCategories();
  const clients = await getClientSummaries();

  return (
    <CreateProjectForm
      projectCategorySelectItems={categories}
      clientSelectItems={clients}
    />
  );
}
