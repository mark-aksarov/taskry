import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { ProjectCategoriesPage } from "./ProjectCategoriesPage";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { ProjectCategoriesPageEmpty } from "./ProjectCategoriesPageEmpty";
import { getProjectCategoryCount } from "@/lib/data/projectCategory/projectCategory.dal";
import { createProjectCategory } from "@/lib/actions/projectCategory/createProjectCategory";
import { NewProjectCategoryForm } from "@/components/projectCategory/NewProjectCategoryForm";
import { ProjectCategoriesContainer } from "@/components/projectCategory/ProjectCategoriesContainer";
import { ProjectCategoryToolbarCreateNewModalTrigger } from "@/components/projectCategory/ProjectCategoryToolbarCreateNewModalTrigger";
import { ProjectCategoryToolbarActionsMenuTrigger } from "@/components/projectCategory/ProjectCategoryToolbarActionsMenuTrigger";
import { deleteProjectCategories } from "@/lib/actions/projectCategory/deleteProjectCategories";

export default async function AppProjectCategoriesPage() {
  // Authorization
  await requireProtectedPage();

  // Get count
  const projectCategoryCount = await getProjectCategoryCount();
  const guestMode = await hasGuestRole();

  const projectCategoryToolbarCreateNewModalTrigger = (
    <ProjectCategoryToolbarCreateNewModalTrigger
      guestMode={guestMode}
      newProjectCategoryForm={
        <NewProjectCategoryForm createProjectCategory={createProjectCategory} />
      }
    />
  );

  if (!projectCategoryCount) {
    return (
      <ProjectCategoriesPageEmpty
        projectCategoryToolbarCreateNewModalTrigger={
          projectCategoryToolbarCreateNewModalTrigger
        }
      />
    );
  }

  return (
    <ProjectCategoriesPage
      projectCategoriesContainer={<ProjectCategoriesContainer />}
      projectCategoryToolbarCreateNewModalTrigger={
        projectCategoryToolbarCreateNewModalTrigger
      }
      projectCategoryToolbarActionsMenuTrigger={
        <ProjectCategoryToolbarActionsMenuTrigger
          guestMode={guestMode}
          deleteProjectCategories={deleteProjectCategories}
        />
      }
    />
  );
}
