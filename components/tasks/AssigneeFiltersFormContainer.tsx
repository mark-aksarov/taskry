import "server-only";

import {
  AssigneeFiltersForm,
  AssigneeFiltersFormSkeleton,
} from "./AssigneeFiltersForm";

import { Suspense } from "react";
import { getUserSummaries } from "@/lib/data/user/user.dal";

export function AssigneeFiltersFormContainer() {
  return (
    <Suspense fallback={<AssigneeFiltersFormSkeleton />}>
      <AssigneeFiltersFormContainerInner />
    </Suspense>
  );
}

async function AssigneeFiltersFormContainerInner() {
  const users = await getUserSummaries();

  return <AssigneeFiltersForm assigneeCheckboxGroupItems={users} />;
}
