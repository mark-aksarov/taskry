import "server-only";

import {
  ProjectClientFiltersForm,
  ProjectClientFiltersFormSkeleton,
} from "./ProjectClientFiltersForm";

import { Suspense } from "react";
import { getClientSummaries } from "@/lib/data/client/client.dal";

export function ProjectClientFiltersFormContainer() {
  return (
    <Suspense fallback={<ProjectClientFiltersFormSkeleton />}>
      <ProjectClientFiltersFormContainerInner />
    </Suspense>
  );
}

async function ProjectClientFiltersFormContainerInner() {
  const clients = await getClientSummaries();

  return <ProjectClientFiltersForm clientCheckboxGroupItems={clients} />;
}
