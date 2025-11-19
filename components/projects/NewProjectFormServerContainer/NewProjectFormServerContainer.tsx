import {
  getProjectStatusSummaries,
  getProjectCategorySummaries,
} from "@/lib/queries/project";
import { NewProjectForm } from "../NewProjectForm";
import { NewProjectFormStatusSelect } from "../NewProjectForm";
import { NewProjectFormCategorySelect } from "../NewProjectForm";

export async function NewProjectFormServerContainer() {
  const categories = await getProjectCategorySummaries(1);
  const statuses = await getProjectStatusSummaries();

  return (
    <NewProjectForm
      projectCategorySelect={
        <NewProjectFormCategorySelect categories={categories} />
      }
      projectStatusSelect={
        <NewProjectFormStatusSelect
          statuses={statuses.map((s) => ({ id: s.id, name: s.nameEn }))}
        />
      }
    />
  );
}
