import "server-only";

import {
  ProjectFormBaseStatusSelect,
  ProjectFormBaseCategorySelect,
  ProjectFormBaseCustomerSelect,
} from "../ProjectFormBase";

import { ProjectFormBase } from "../ProjectFormBase";
import { createProject } from "@/lib/actions/project/createProject";
import { getCustomerSummaries } from "@/lib/data/customer/customer.service";
import { getProjectCategorySummaries } from "@/lib/data/projectCategory/projectCategory.service";

export async function NewProjectFormContainer() {
  const categories = await getProjectCategorySummaries();
  const customers = await getCustomerSummaries();

  return (
    <ProjectFormBase
      id="new-project-form"
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
