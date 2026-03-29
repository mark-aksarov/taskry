import { TaskCategoriesPage } from "./TaskCategoriesPage";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";
import { getTaskCategorySummaries } from "@/lib/data/taskCategory/taskCategory.dal";
import { CreateTaskCategoryModal } from "@/components/taskCategory/CreateTaskCategoryModal";
import { TaskCategoriesContainer } from "@/components/taskCategory/TaskCategoriesContainer";
import { DeleteTaskCategoriesModal } from "@/components/taskCategory/DeleteTaskCategoriesModal";
import { CreateTaskCategoryProvider } from "@/components/taskCategory/CreateTaskCategoryProvider";
import { DeleteTaskCategoriesProvider } from "@/components/taskCategory/DeleteTaskCategoriesProvider";

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
