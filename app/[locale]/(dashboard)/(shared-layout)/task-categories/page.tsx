import { TaskCategoriesPage } from "./TaskCategoriesPage";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { TaskCategoriesPageProviders } from "./TaskCategoriesPageProviders";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { getTaskCategorySummaries } from "@/lib/data/taskCategory/taskCategory.dal";
import { TaskCategoriesContainer } from "@/components/taskCategory/TaskCategoriesContainer";

export default async function AppTaskCategoriesPage() {
  // Authorization
  await requireProtectedPage();

  const taskCategories = await getTaskCategorySummaries();

  return (
    <TaskCategoriesPageProviders
      pageItems={taskCategories.map((t) => ({ id: t.id }))}
    >
      <TaskCategoriesPage
        totalCount={taskCategories.length}
        searchContainer={<LinkSearchContainer pathname="/tasks" />}
        taskCategoriesContainer={<TaskCategoriesContainer />}
      />
    </TaskCategoriesPageProviders>
  );
}
