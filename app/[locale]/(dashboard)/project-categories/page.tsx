import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { ProjectCategoriesPage } from "./ProjectCategoriesPage";
import { getProjectCount } from "@/lib/data/project/project.dal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { createProjectCategory } from "@/lib/actions/projectCategory/createProjectCategory";
import { NewProjectCategoryForm } from "@/components/projectCategory/NewProjectCategoryForm";
import { ProjectCategoriesContainer } from "@/components/projectCategory/ProjectCategoriesContainer";
import { ProjectCategoryToolbarCreateNewButton } from "@/components/projectCategory/ProjectCategoryToolbarCreateNewButton";
import { ProjectCategoryToolbarActionsMenuTrigger } from "@/components/projectCategory/ProjectCategoryToolbarActionsMenuTrigger";
import { ProjectCategoriesPageEmpty } from "./ProjectCategoriesPageEmpty";

export default async function AppProjectCategoriesPage() {
  // Authorization
  await requireProtectedPage();

  // Get count
  const projectCount = await getProjectCount();
  const guestMode = await hasGuestRole();

  const projectCategoryToolbarCreateNewButton = (
    <ProjectCategoryToolbarCreateNewButton
      guestMode={guestMode}
      newProjectCategoryForm={
        <NewProjectCategoryForm createProjectCategory={createProjectCategory} />
      }
    />
  );

  if (!projectCount) {
    return (
      <ProjectCategoriesPageEmpty
        projectCategoryToolbarCreateNewButton={
          projectCategoryToolbarCreateNewButton
        }
      />
    );
  }

  return (
    <ProjectCategoriesPage
      projectCategoriesContainer={<ProjectCategoriesContainer />}
      projectCategoryToolbarCreateNewButton={
        projectCategoryToolbarCreateNewButton
      }
      projectToolbarActionsMenuTrigger={
        <ProjectCategoryToolbarActionsMenuTrigger guestMode={guestMode} />
      }
    />
  );
}
