import { NewProjectForm } from "./NewProjectForm";
import { ProjectStatusSelect } from "./ProjectStatusSelect";
import { ProjectCategorySelect } from "./ProjectCategorySelect";
import {
  getProjectCategories,
  getProjectStatuses,
} from "@/lib/queries/project";

export async function NewProjectFormContainer() {
  const categories = await getProjectCategories(1);
  const statuses = await getProjectStatuses();

  return (
    <NewProjectForm
      projectCategorySelect={<ProjectCategorySelect categories={categories} />}
      projectStatusSelect={
        <ProjectStatusSelect
          statuses={statuses.map((s) => ({ id: s.id, name: s.nameEn }))}
        />
      }
    />
  );
}
