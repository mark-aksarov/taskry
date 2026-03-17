import "server-only";

import {
  TaskAssigneeFiltersForm,
  TaskAssigneeFiltersFormSkeleton,
} from "./TaskAssigneeFiltersForm";

import { Suspense } from "react";
import { getUserSummaries } from "@/lib/data/user/user.dal";

export function TaskAssigneeFiltersFormContainer() {
  return (
    <Suspense fallback={<TaskAssigneeFiltersFormSkeleton />}>
      <TaskAssigneeFiltersFormContainerInner />
    </Suspense>
  );
}

async function TaskAssigneeFiltersFormContainerInner() {
  const users = await getUserSummaries();

  return <TaskAssigneeFiltersForm assigneeCheckboxGroupItems={users} />;
}
