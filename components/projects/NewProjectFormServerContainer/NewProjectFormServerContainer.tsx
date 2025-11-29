import { NewProjectForm } from "../NewProjectForm";
import { NewProjectFormStatusSelect } from "../NewProjectForm";
import { NewProjectFormCategorySelect } from "../NewProjectForm";
import { getProjectCategorySummaries } from "@/lib/queries/project";

export async function NewProjectFormServerContainer() {
  const categories = await getProjectCategorySummaries(1);

  return (
    <NewProjectForm
      projectCategorySelect={
        <NewProjectFormCategorySelect categories={categories} />
      }
      projectStatusSelect={<NewProjectFormStatusSelect />}
    />
  );
}
