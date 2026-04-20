import "server-only";

import {
  ProjectCategoryFiltersForm,
  ProjectCategoryFiltersFormSkeleton,
} from "./ProjectCategoryFiltersForm";

import { Suspense } from "react";
import { getProjectCategorySummaries } from "@/lib/data/projectCategory/projectCategory.dal";

export function ProjectCategoryFiltersFormContainer() {
  return (
    <Suspense fallback={<ProjectCategoryFiltersFormSkeleton />}>
      <ProjectFiltersFormContainerInner />
    </Suspense>
  );
}

async function ProjectFiltersFormContainerInner() {
  const categories = await getProjectCategorySummaries();

  return <ProjectCategoryFiltersForm categoryCheckboxGroupItems={categories} />;
}
