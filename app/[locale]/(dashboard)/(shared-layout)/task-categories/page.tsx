import { TaskCategoriesPage } from "./TaskCategoriesPage";
import { TaskSearchModal } from "@/dashboard/tasks/TaskSearchModal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { LinkSearchContainer } from "@/dashboard/common/LinkSearchContainer";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { getTaskCategorySummaries } from "@/lib/data/taskCategory/taskCategory.dal";
import { CreateTaskCategoryModal } from "@/dashboard/taskCategory/CreateTaskCategoryModal";
import { TaskCategoriesContainer } from "@/dashboard/taskCategory/TaskCategoriesContainer";
import { DeleteTaskCategoriesModal } from "@/dashboard/taskCategory/DeleteTaskCategoriesModal";
import { CreateTaskCategoryProvider } from "@/dashboard/taskCategory/CreateTaskCategoryProvider";
import { DeleteTaskCategoriesProvider } from "@/dashboard/taskCategory/DeleteTaskCategoriesProvider";

export default async function AppTaskCategoriesPage() {
  // Authorization
  await requireProtectedPage();

  const taskCategories = await getTaskCategorySummaries();

  return (
    <SelectedItemsProvider
      pageItems={taskCategories.map((t) => ({ id: t.id }))}
    >
      <DeleteTaskCategoriesProvider>
        <CreateTaskCategoryProvider>
          <TaskCategoriesPage
            totalCount={taskCategories.length}
            taskCategoriesContainer={<TaskCategoriesContainer />}
          />

          <TaskSearchModal
            searchContainer={<LinkSearchContainer pathname="/tasks" />}
          />
          <CreateTaskCategoryModal />
          <DeleteTaskCategoriesModal />
        </CreateTaskCategoryProvider>
      </DeleteTaskCategoriesProvider>
    </SelectedItemsProvider>
  );
}
