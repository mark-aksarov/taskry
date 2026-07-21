import { TaskCategoriesPage } from "./TaskCategoriesPage";
import { TaskSearchModal } from "@/dashboard/tasks/TaskSearchModal";
import { LinkSearchContainer } from "@/dashboard/common/LinkSearchContainer";
import { getTaskCategories } from "@/lib/data/taskCategory/taskCategory.dal";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { requireProtectedPageSession } from "@/lib/utils/requireProtectedPageSession";
import { CreateTaskCategoryModal } from "@/dashboard/taskCategory/CreateTaskCategoryModal";
import { TaskCategoriesContainer } from "@/dashboard/taskCategory/TaskCategoriesContainer";
import { ImportTaskCategoriesModal } from "@/dashboard/taskCategory/ImportTaskCategoriesModal";
import { DeleteTaskCategoriesModal } from "@/dashboard/taskCategory/DeleteTaskCategoriesModal";
import { CreateTaskCategoryProvider } from "@/dashboard/taskCategory/CreateTaskCategoryProvider";
import { DeleteTaskCategoriesProvider } from "@/dashboard/taskCategory/DeleteTaskCategoriesProvider";
import { ImportTaskCategoriesProvider } from "@/dashboard/taskCategory/ImportTaskCategoriesProvider";

export default async function AppTaskCategoriesPage() {
  // Authorization
  await requireProtectedPageSession();

  const taskCategories = await getTaskCategories();

  return (
    <SelectedItemsProvider
      pageItems={taskCategories.map((t) => ({ id: t.id }))}
    >
      <DeleteTaskCategoriesProvider>
        <CreateTaskCategoryProvider>
          <ImportTaskCategoriesProvider>
            <TaskCategoriesPage
              totalCount={taskCategories.length}
              taskCategoriesContainer={<TaskCategoriesContainer />}
            />

            <TaskSearchModal
              searchContainer={<LinkSearchContainer pathname="/tasks" />}
            />
            <CreateTaskCategoryModal />
            <DeleteTaskCategoriesModal />
            <ImportTaskCategoriesModal />
          </ImportTaskCategoriesProvider>
        </CreateTaskCategoryProvider>
      </DeleteTaskCategoriesProvider>
    </SelectedItemsProvider>
  );
}
