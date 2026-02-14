import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { TaskCategoriesPage } from "./TaskCategoriesPage";
import { TaskCategoriesPageEmpty } from "./TaskCategoriesPageEmpty";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { getTaskCategoryCount } from "@/lib/data/taskCategory/taskCategory.dal";
import { createTaskCategory } from "@/lib/actions/taskCategory/createTaskCategory";
import { NewTaskCategoryForm } from "@/components/taskCategory/NewTaskCategoryForm";
import { TaskCategoriesContainer } from "@/components/taskCategory/TaskCategoriesContainer";
import { TaskCategoryToolbarCreateNewModalTrigger } from "@/components/taskCategory/TaskCategoryToolbarCreateNewModalTrigger";
import { TaskCategoryToolbarActionsMenuTrigger } from "@/components/taskCategory/TaskCategoryToolbarActionsMenuTrigger";
import { deleteTaskCategories } from "@/lib/actions/taskCategory/deleteTaskCategories";

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

  return (
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
  );
}
