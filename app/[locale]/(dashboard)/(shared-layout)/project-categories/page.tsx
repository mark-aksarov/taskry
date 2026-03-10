import { ProjectCategoriesPage } from "./ProjectCategoriesPage";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";
import { PageTransitionProvider } from "@/components/common/PageTransitionContext";
import { createProjectCategory } from "@/lib/actions/projectCategory/createProjectCategory";
import { getProjectCategorySummaries } from "@/lib/data/projectCategory/projectCategory.dal";
import { deleteProjectCategories } from "@/lib/actions/projectCategory/deleteProjectCategories";
import { ProjectCategoriesContainer } from "@/components/projectCategory/ProjectCategoriesContainer";
import { DeleteProjectCategoriesProvider } from "@/components/projectCategory/DeleteProjectCategoriesContext";
import { CreateProjectCategoryProvider } from "@/components/projectCategory/CreateProjectCategoryContext";

export default async function AppProjectCategoriesPage() {
  // Authorization
  await requireProtectedPage();

  const projectCategories = await getProjectCategorySummaries();

  return (
    <SelectedItemsProvider
      pageItems={projectCategories.map((p) => ({ id: p.id }))}
    >
      <PageTransitionProvider>
        <DeleteProjectCategoriesProvider
          deleteProjectCategories={deleteProjectCategories}
        >
          <CreateProjectCategoryProvider
            createProjectCategory={createProjectCategory}
          >
            <ProjectCategoriesPage
              totalCount={projectCategories.length}
              projectCategoriesContainer={<ProjectCategoriesContainer />}
            />
          </CreateProjectCategoryProvider>
        </DeleteProjectCategoriesProvider>
      </PageTransitionProvider>
    </SelectedItemsProvider>
  );
}
