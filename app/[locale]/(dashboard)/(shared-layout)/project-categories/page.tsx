import { ProjectCategoriesPage } from "./ProjectCategoriesPage";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";
import { createProjectCategory } from "@/lib/actions/projectCategory/createProjectCategory";
import { getProjectCategorySummaries } from "@/lib/data/projectCategory/projectCategory.dal";
import { deleteProjectCategories } from "@/lib/actions/projectCategory/deleteProjectCategories";
import { ProjectCategoriesContainer } from "@/components/projectCategory/ProjectCategoriesContainer";
import { CreateProjectCategoryProvider } from "@/components/projectCategory/CreateProjectCategoryContext";
import { DeleteProjectCategoriesProvider } from "@/components/projectCategory/DeleteProjectCategoriesContext";

export default async function AppProjectCategoriesPage() {
  // Authorization
  await requireProtectedPage();

  const projectCategories = await getProjectCategorySummaries();

  return (
    <SelectedItemsProvider
      pageItems={projectCategories.map((p) => ({ id: p.id }))}
    >
      <DeleteProjectCategoriesProvider
        deleteProjectCategories={deleteProjectCategories}
      >
        <CreateProjectCategoryProvider
          createProjectCategory={createProjectCategory}
        >
          <ProjectCategoriesPage
            totalCount={projectCategories.length}
            searchContainer={<LinkSearchContainer pathname="/tasks" />}
            projectCategoriesContainer={<ProjectCategoriesContainer />}
          />
        </CreateProjectCategoryProvider>
      </DeleteProjectCategoriesProvider>
    </SelectedItemsProvider>
  );
}
