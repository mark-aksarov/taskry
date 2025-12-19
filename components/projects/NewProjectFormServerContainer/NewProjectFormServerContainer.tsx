import { NewProjectForm } from "../NewProjectForm";
import { getCustomerSummaries } from "@/lib/dal/customers";
import { createProject } from "@/lib/actions/createProject";
import { NewProjectFormStatusSelect } from "../NewProjectForm";
import { getProjectCategorySummaries } from "@/lib/dal/project";
import { NewProjectFormCategorySelect } from "../NewProjectForm";
import { NewProjectFormCustomerSelect } from "../NewProjectForm";

export async function NewProjectFormServerContainer() {
  const categories = await getProjectCategorySummaries();
  const customers = await getCustomerSummaries();

  return (
    <NewProjectForm
      projectCategorySelect={
        <NewProjectFormCategorySelect categories={categories} />
      }
      projectCustomerSelect={
        <NewProjectFormCustomerSelect customers={customers} />
      }
      projectStatusSelect={<NewProjectFormStatusSelect />}
      createProjectAction={createProject}
    />
  );
}
