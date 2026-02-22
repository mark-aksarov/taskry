import {
  getProjectCategoryCount,
  getProjectCategorySummaries,
} from "@/lib/data/projectCategory/projectCategory.dal";

import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { ProjectCategoriesPage } from "./ProjectCategoriesPage";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { ProjectCategoriesPageEmpty } from "./ProjectCategoriesPageEmpty";
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";
import { PageTransitionProvider } from "@/components/common/PageTransitionContext";
import { createProjectCategory } from "@/lib/actions/projectCategory/createProjectCategory";
import { NewProjectCategoryForm } from "@/components/projectCategory/NewProjectCategoryForm";
import { deleteProjectCategories } from "@/lib/actions/projectCategory/deleteProjectCategories";
import { ProjectCategoriesContainer } from "@/components/projectCategory/ProjectCategoriesContainer";
import { ProjectCategoryToolbarActionsMenuTrigger } from "@/components/projectCategory/ProjectCategoryToolbarActionsMenuTrigger";
import { ProjectCategoryToolbarCreateNewModalTrigger } from "@/components/projectCategory/ProjectCategoryToolbarCreateNewModalTrigger";

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

  const projectCategories = await getProjectCategorySummaries();

  return (
    <SelectedItemsProvider
      pageItems={projectCategories.map((p) => ({ id: p.id }))}
    >
      <PageTransitionProvider>
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
      </PageTransitionProvider>
    </SelectedItemsProvider>
  );
}
