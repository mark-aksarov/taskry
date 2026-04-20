import "server-only";

import {
  TaskProjectFiltersForm,
  TaskProjectFiltersFormSkeleton,
} from "./TaskProjectFiltersForm";

import { Suspense } from "react";
import { getProjectSummaries } from "@/lib/data/project/project.dal";

export function TaskProjectFiltersFormContainer() {
  return (
    <Suspense fallback={<TaskProjectFiltersFormSkeleton />}>
      <TaskFiltersFormContainerInner />
    </Suspense>
  );
}

async function TaskFiltersFormContainerInner() {
  const projects = await getProjectSummaries();

  return <TaskProjectFiltersForm projectCheckboxGroupItems={projects} />;
}
