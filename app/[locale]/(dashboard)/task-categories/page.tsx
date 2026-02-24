import {
  getTaskCategoryCount,
  getTaskCategorySummaries,
} from "@/lib/data/taskCategory/taskCategory.dal";

import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { TaskCategoriesPage } from "./TaskCategoriesPage";
import { TaskCategoriesPageEmpty } from "./TaskCategoriesPageEmpty";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";
import { createTaskCategory } from "@/lib/actions/taskCategory/createTaskCategory";
import { PageTransitionProvider } from "@/components/common/PageTransitionContext";
import { deleteTaskCategories } from "@/lib/actions/taskCategory/deleteTaskCategories";
import { TaskCategoriesContainer } from "@/components/taskCategory/TaskCategoriesContainer";

export default async function AppTaskCategoriesPage() {
  // Authorization
  await requireProtectedPage();

  // Get count
  const taskCategoryCount = await getTaskCategoryCount();
  const guestMode = await hasGuestRole();

  if (!taskCategoryCount) {
    return (
      <TaskCategoriesPageEmpty
        guestMode={guestMode}
        createTaskCategory={createTaskCategory}
      />
    );
  }

  const taskCategories = await getTaskCategorySummaries();

  return (
    <SelectedItemsProvider
      pageItems={taskCategories.map((t) => ({ id: t.id }))}
    >
      <PageTransitionProvider>
        <TaskCategoriesPage
          taskCategoriesContainer={<TaskCategoriesContainer />}
          guestMode={guestMode}
          createTaskCategory={createTaskCategory}
          deleteTaskCategories={deleteTaskCategories}
        />
      </PageTransitionProvider>
    </SelectedItemsProvider>
  );
}
