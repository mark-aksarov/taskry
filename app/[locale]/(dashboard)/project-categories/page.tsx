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
import { deleteProjectCategories } from "@/lib/actions/projectCategory/deleteProjectCategories";
import { ProjectCategoriesContainer } from "@/components/projectCategory/ProjectCategoriesContainer";

export default async function AppProjectCategoriesPage() {
  // Authorization
  await requireProtectedPage();

  // Get count
  const projectCategoryCount = await getProjectCategoryCount();
  const guestMode = await hasGuestRole();

  if (!projectCategoryCount) {
    return (
      <ProjectCategoriesPageEmpty
        guestMode={guestMode}
        createProjectCategory={createProjectCategory}
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
          guestMode={guestMode}
          createProjectCategory={createProjectCategory}
          deleteProjectCategories={deleteProjectCategories}
        />
      </PageTransitionProvider>
    </SelectedItemsProvider>
  );
}
