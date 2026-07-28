import { TaskCategoriesPage } from "./TaskCategoriesPage";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { LinkSearchContainer } from "@/dashboard/common/LinkSearchContainer";
import { getTaskCategories } from "@/lib/data/taskCategory/taskCategory.dal";
import { TaskCategoriesContainer } from "@/dashboard/taskCategory/TaskCategoriesContainer";

export default async function AppTaskCategoriesPage() {
  // Authorization
  await requireFullAccess();

  const taskCategories = await getTaskCategories();

  return (
    <TaskCategoriesPage
      totalCount={taskCategories.length}
      selectedItems={taskCategories.map((t) => ({ id: t.id }))}
      taskCategoriesContainer={<TaskCategoriesContainer />}
      searchContainer={<LinkSearchContainer pathname="/tasks" />}
    />
  );
}
