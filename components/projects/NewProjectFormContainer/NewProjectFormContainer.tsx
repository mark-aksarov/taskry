import "server-only";

import { Suspense } from "react";
import { NewProjectForm } from "../NewProjectForm";
import { ProjectFormSkeleton } from "../ProjectFormSkeleton";
import { createProject } from "@/lib/actions/project/createProject";
import { getCustomerSummaries } from "@/lib/data/customer/customer.dal";
import { getProjectCategorySummaries } from "@/lib/data/projectCategory/projectCategory.dal";

export function NewProjectFormContainer() {
  return (
    <Suspense fallback={<ProjectFormSkeleton />}>
      <NewProjectFormContainerInner />
    </Suspense>
  );
}

async function NewProjectFormContainerInner() {
  const categories = await getProjectCategorySummaries();
  const customers = await getCustomerSummaries();

  return (
    <NewProjectForm
      projectCategorySelectItems={categories}
      projectCustomerSelectItems={customers}
      createProject={createProject}
    />
  );
}
