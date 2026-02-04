import "server-only";

import { Suspense } from "react";
import { NewProjectForm } from "../NewProjectForm";
import { ProjectFormSkeleton } from "../ProjectFormSkeleton";
import { ProjectCategorySelect } from "../ProjectCategorySelect";
import { ProjectCustomerSelect } from "../ProjectCustomerSelect";
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
      projectCategorySelect={<ProjectCategorySelect categories={categories} />}
      projectCustomerSelect={<ProjectCustomerSelect customers={customers} />}
      createProject={createProject}
    />
  );
}
