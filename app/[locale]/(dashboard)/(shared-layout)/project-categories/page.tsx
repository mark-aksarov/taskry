import { ProjectCategoriesPage } from "./ProjectCategoriesPage";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";
import { getProjectCategorySummaries } from "@/lib/data/projectCategory/projectCategory.dal";
import { ProjectCategoriesContainer } from "@/components/projectCategory/ProjectCategoriesContainer";
import { CreateProjectCategoryProvider } from "@/components/projectCategory/CreateProjectCategoryProvider";
import { DeleteProjectCategoriesProvider } from "@/components/projectCategory/DeleteProjectCategoriesProvider";
import { CreateProjectCategoryModalProvider } from "@/components/projectCategory/CreateProjectCategoryModal";

export default async function AppProjectCategoriesPage() {
  // Authorization
  await requireProtectedPage();

  const projectCategories = await getProjectCategorySummaries();

  return (
    <SelectedItemsProvider
      pageItems={projectCategories.map((p) => ({ id: p.id }))}
    >
      <DeleteProjectCategoriesProvider>
        <CreateProjectCategoryModalProvider>
          <CreateProjectCategoryProvider>
            <ProjectCategoriesPage
              totalCount={projectCategories.length}
              searchContainer={<LinkSearchContainer pathname="/tasks" />}
              projectCategoriesContainer={<ProjectCategoriesContainer />}
            />
          </CreateProjectCategoryProvider>
        </CreateProjectCategoryModalProvider>
      </DeleteProjectCategoriesProvider>
    </SelectedItemsProvider>
  );
}
