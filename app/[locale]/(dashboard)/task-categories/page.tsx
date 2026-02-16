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
import { NewTaskCategoryForm } from "@/components/taskCategory/NewTaskCategoryForm";
import { deleteTaskCategories } from "@/lib/actions/taskCategory/deleteTaskCategories";
import { TaskCategoriesContainer } from "@/components/taskCategory/TaskCategoriesContainer";
import { TaskCategoryToolbarActionsMenuTrigger } from "@/components/taskCategory/TaskCategoryToolbarActionsMenuTrigger";
import { TaskCategoryToolbarCreateNewModalTrigger } from "@/components/taskCategory/TaskCategoryToolbarCreateNewModalTrigger";

export default async function AppTaskCategoriesPage() {
  // Authorization
  await requireProtectedPage();

  // Get count
  const taskCategoryCount = await getTaskCategoryCount();
  const guestMode = await hasGuestRole();

  const taskCategoryToolbarCreateNewModalTrigger = (
    <TaskCategoryToolbarCreateNewModalTrigger
      guestMode={guestMode}
      newTaskCategoryForm={
        <NewTaskCategoryForm createTaskCategory={createTaskCategory} />
      }
    />
  );

  if (!taskCategoryCount) {
    return (
      <TaskCategoriesPageEmpty
        taskCategoryToolbarCreateNewModalTrigger={
          taskCategoryToolbarCreateNewModalTrigger
        }
      />
    );
  }

  const taskCategories = await getTaskCategorySummaries();

  return (
    <SelectedItemsProvider
      pageItems={taskCategories.map((t) => ({ id: t.id }))}
    >
      <TaskCategoriesPage
        taskCategoriesContainer={<TaskCategoriesContainer />}
        taskCategoryToolbarCreateNewModalTrigger={
          taskCategoryToolbarCreateNewModalTrigger
        }
        taskCategoryToolbarActionsMenuTrigger={
          <TaskCategoryToolbarActionsMenuTrigger
            guestMode={guestMode}
            deleteTaskCategories={deleteTaskCategories}
          />
        }
      />
    </SelectedItemsProvider>
  );
}
