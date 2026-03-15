import { TaskCategoriesPage } from "./TaskCategoriesPage";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";
import { createTaskCategory } from "@/lib/actions/taskCategory/createTaskCategory";
import { getTaskCategorySummaries } from "@/lib/data/taskCategory/taskCategory.dal";
import { deleteTaskCategories } from "@/lib/actions/taskCategory/deleteTaskCategories";
import { TaskCategoriesContainer } from "@/components/taskCategory/TaskCategoriesContainer";
import { CreateTaskCategoryProvider } from "@/components/taskCategory/CreateTaskCategoryContext";
import { DeleteTaskCategoriesProvider } from "@/components/taskCategory/DeleteTaskCategoriesContext";

export default async function AppTaskCategoriesPage() {
  // Authorization
  await requireProtectedPage();

  const taskCategories = await getTaskCategorySummaries();

  return (
    <SelectedItemsProvider
      pageItems={taskCategories.map((t) => ({ id: t.id }))}
    >
      <DeleteTaskCategoriesProvider deleteTaskCategories={deleteTaskCategories}>
        <CreateTaskCategoryProvider createTaskCategory={createTaskCategory}>
          <TaskCategoriesPage
            totalCount={taskCategories.length}
            searchContainer={<LinkSearchContainer pathname="/tasks" />}
            taskCategoriesContainer={<TaskCategoriesContainer />}
          />
        </CreateTaskCategoryProvider>
      </DeleteTaskCategoriesProvider>
    </SelectedItemsProvider>
  );
}
