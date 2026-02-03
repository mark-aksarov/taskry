import "server-only";

import {
  ProjectFormBaseSkeleton,
  ProjectFormBaseStatusSelect,
  ProjectFormBaseCategorySelect,
  ProjectFormBaseCustomerSelect,
} from "../ProjectFormBase";

import { Suspense } from "react";
import { NewProjectForm } from "../NewProjectForm";
import { createProject } from "@/lib/actions/project/createProject";
import { getCustomerSummaries } from "@/lib/data/customer/customer.dal";
import { getProjectCategorySummaries } from "@/lib/data/projectCategory/projectCategory.dal";

export function NewProjectFormContainer() {
  return (
    <Suspense fallback={<ProjectFormBaseSkeleton />}>
      <NewProjectFormContainerInner />
    </Suspense>
  );
}

async function NewProjectFormContainerInner() {
  const categories = await getProjectCategorySummaries();
  const customers = await getCustomerSummaries();

  return (
    <NewProjectForm
      projectCategorySelect={
        <ProjectFormBaseCategorySelect categories={categories} />
      }
      projectCustomerSelect={
        <ProjectFormBaseCustomerSelect customers={customers} />
      }
      projectStatusSelect={<ProjectFormBaseStatusSelect />}
      formAction={createProject}
    />
  );
}
