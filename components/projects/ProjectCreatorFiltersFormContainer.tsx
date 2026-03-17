import "server-only";

import {
  ProjectCreatorFiltersForm,
  ProjectCreatorFiltersFormSkeleton,
} from "./ProjectCreatorFiltersForm";

import { Suspense } from "react";
import { getUserSummaries } from "@/lib/data/user/user.dal";

export function ProjectCreatorFiltersFormContainer() {
  return (
    <Suspense fallback={<ProjectCreatorFiltersFormSkeleton />}>
      <ProjectCreatorFiltersFormContainerInner />
    </Suspense>
  );
}

async function ProjectCreatorFiltersFormContainerInner() {
  const users = await getUserSummaries();

  return <ProjectCreatorFiltersForm creatorCheckboxGroupItems={users} />;
}
