import { ProjectCategoriesPage } from "./ProjectCategoriesPage";
import { TaskSearchModal } from "@/dashboard/tasks/TaskSearchModal";
import { LinkSearchContainer } from "@/dashboard/common/LinkSearchContainer";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { getProjectCategories } from "@/lib/data/projectCategory/projectCategory.dal";
import { ProjectCategoriesContainer } from "@/dashboard/projectCategory/ProjectCategoriesContainer";
import { CreateProjectCategoryModal } from "@/dashboard/projectCategory/CreateProjectCategoryModal";
import { DeleteProjectCategoriesModal } from "@/dashboard/projectCategory/DeleteProjectCategoriesModal";
import { ImportProjectCategoriesModal } from "@/dashboard/projectCategory/ImportProjectCategoriesModal";
import { CreateProjectCategoryProvider } from "@/dashboard/projectCategory/CreateProjectCategoryProvider";
import { DeleteProjectCategoriesProvider } from "@/dashboard/projectCategory/DeleteProjectCategoriesProvider";
import { ImportProjectCategoriesProvider } from "@/dashboard/projectCategory/ImportProjectCategoriesProvider";

export default async function AppProjectCategoriesPage() {
  // Authorization
  await requireFullAccess();

  const projectCategories = await getProjectCategories();

  return (
    <SelectedItemsProvider
      pageItems={projectCategories.map((p) => ({ id: p.id }))}
    >
      <DeleteProjectCategoriesProvider>
        <CreateProjectCategoryProvider>
          <ImportProjectCategoriesProvider>
            <ProjectCategoriesPage
              totalCount={projectCategories.length}
              projectCategoriesContainer={<ProjectCategoriesContainer />}
            />

            <TaskSearchModal
              searchContainer={<LinkSearchContainer pathname="/tasks" />}
            />
            <CreateProjectCategoryModal />
            <DeleteProjectCategoriesModal />
            <ImportProjectCategoriesModal />
          </ImportProjectCategoriesProvider>
        </CreateProjectCategoryProvider>
      </DeleteProjectCategoriesProvider>
    </SelectedItemsProvider>
  );
}
