import "server-only";

import {
  ProjectFiltersForm,
  ProjectFiltersFormSkeleton,
} from "../ProjectFiltersForm";

import { Suspense } from "react";
import { getUserSummaries } from "@/lib/data/user/user.dal";
import { getClientSummaries } from "@/lib/data/client/client.dal";
import { getProjectCategories } from "@/lib/data/projectCategory/projectCategory.dal";

export function ProjectFiltersFormContainer() {
  return (
    <Suspense fallback={<ProjectFiltersFormSkeleton />}>
      <ProjectFiltersFormContainerInner />
    </Suspense>
  );
}

async function ProjectFiltersFormContainerInner() {
  const categories = await getProjectCategories();
  const clients = await getClientSummaries();
  const users = await getUserSummaries();

  return (
    <ProjectFiltersForm
      userCheckboxGroupItems={users}
      categoryCheckboxGroupItems={categories}
      clientCheckboxGroupItems={clients}
    />
  );
}
