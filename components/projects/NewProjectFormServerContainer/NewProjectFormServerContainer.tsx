import { NewProjectForm } from "../NewProjectForm";
import { NewProjectFormStatusSelect } from "../NewProjectForm";
import { NewProjectFormCategorySelect } from "../NewProjectForm";
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";
import { getProjectCategorySummaries } from "@/lib/queries/project";

export async function NewProjectFormServerContainer() {
  const workspaceId = await getUserWorkspaceId();
  const categories = await getProjectCategorySummaries(workspaceId);

  return (
    <NewProjectForm
      projectCategorySelect={
        <NewProjectFormCategorySelect categories={categories} />
      }
      projectStatusSelect={<NewProjectFormStatusSelect />}
    />
  );
}
