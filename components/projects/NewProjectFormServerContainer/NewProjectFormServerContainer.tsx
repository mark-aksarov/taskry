import {
  ProjectFormBaseStatusSelect,
  ProjectFormBaseCategorySelect,
  ProjectFormBaseCustomerSelect,
} from "../ProjectFormBase";

import { NewProjectForm } from "../NewProjectForm";
import { createProject } from "@/lib/actions/project/createProject";
import { getCustomerSummaries } from "@/lib/data/customer/customer.service";
import { getProjectCategorySummaries } from "@/lib/data/projectCategory/projectCategory.service";

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
