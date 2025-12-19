import {
  ProjectFormBaseStatusSelect,
  ProjectFormBaseCategorySelect,
  ProjectFormBaseCustomerSelect,
} from "../ProjectFormBase";

import { NewProjectForm } from "../NewProjectForm";
import { getCustomerSummaries } from "@/lib/dal/customers";
import { createProject } from "@/lib/actions/createProject";
import { getProjectCategorySummaries } from "@/lib/dal/project";

export async function NewProjectFormServerContainer() {
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
