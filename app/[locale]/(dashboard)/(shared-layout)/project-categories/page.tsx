import { ProjectCategoriesPage } from "./ProjectCategoriesPage";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";
import { getProjectCategorySummaries } from "@/lib/data/projectCategory/projectCategory.dal";
import { ProjectCategoriesContainer } from "@/components/projectCategory/ProjectCategoriesContainer";
import { CreateProjectCategoryModal } from "@/components/projectCategory/CreateProjectCategoryModal";
import { DeleteProjectCategoriesModal } from "@/components/projectCategory/DeleteProjectCategoriesModal";
import { CreateProjectCategoryProvider } from "@/components/projectCategory/CreateProjectCategoryProvider";
import { DeleteProjectCategoriesProvider } from "@/components/projectCategory/DeleteProjectCategoriesProvider";

export default async function AppProjectCategoriesPage() {
  // Authorization
  await requireProtectedPage();

  const projectCategories = await getProjectCategorySummaries();

  return (
    <SelectedItemsProvider
      pageItems={projectCategories.map((p) => ({ id: p.id }))}
    >
      <DeleteProjectCategoriesProvider>
        <CreateProjectCategoryProvider>
          <ProjectCategoriesPage
            totalCount={projectCategories.length}
            projectCategoriesContainer={<ProjectCategoriesContainer />}
          />

          <TaskSearchModal
            searchContainer={<LinkSearchContainer pathname="/tasks" />}
          />
          <CreateProjectCategoryModal />
          <DeleteProjectCategoriesModal />
        </CreateProjectCategoryProvider>
      </DeleteProjectCategoriesProvider>
    </SelectedItemsProvider>
  );
}
