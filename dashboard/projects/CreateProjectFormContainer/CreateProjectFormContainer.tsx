import "server-only";

import { Suspense } from "react";
import { CreateProjectForm } from "../CreateProjectForm";
import { ProjectFormSkeleton } from "../ProjectFormSkeleton";
import { getCustomerSummaries } from "@/lib/data/customer/customer.dal";
import { getProjectCategorySummaries } from "@/lib/data/projectCategory/projectCategory.dal";

export function CreateProjectFormContainer() {
  return (
    <Suspense fallback={<ProjectFormSkeleton />}>
      <CreateProjectFormContainerInner />
    </Suspense>
  );
}

async function CreateProjectFormContainerInner() {
  const categories = await getProjectCategorySummaries();
  const customers = await getCustomerSummaries();

  return (
    <CreateProjectForm
      projectCategorySelectItems={categories}
      customerSelectItems={customers}
    />
  );
}
