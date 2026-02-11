import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { TaskCategoriesPage } from "./TaskCategoriesPage";
import { TaskCategoriesPageEmpty } from "./TaskCategoriesPageEmpty";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { getTaskCategoryCount } from "@/lib/data/taskCategory/taskCategory.dal";
import { createTaskCategory } from "@/lib/actions/taskCategory/createTaskCategory";
import { NewTaskCategoryForm } from "@/components/taskCategory/NewTaskCategoryForm";
import { TaskCategoriesContainer } from "@/components/taskCategory/TaskCategoriesContainer";
import { TaskCategoryToolbarCreateNewButton } from "@/components/taskCategory/TaskCategoryToolbarCreateNewButton";
import { TaskCategoryToolbarActionsMenuTrigger } from "@/components/taskCategory/TaskCategoryToolbarActionsMenuTrigger";

export default async function AppTaskCategoriesPage() {
  // Authorization
  await requireProtectedPage();

  // Get count
  const taskCategoryCount = await getTaskCategoryCount();
  const guestMode = await hasGuestRole();

  const taskCategoryToolbarCreateNewButton = (
    <TaskCategoryToolbarCreateNewButton
      guestMode={guestMode}
      newTaskCategoryForm={
        <NewTaskCategoryForm createTaskCategory={createTaskCategory} />
      }
    />
  );

  if (!taskCategoryCount) {
    return (
      <TaskCategoriesPageEmpty
        taskCategoryToolbarCreateNewButton={taskCategoryToolbarCreateNewButton}
      />
    );
  }

  return (
    <TaskCategoriesPage
      taskCategoriesContainer={<TaskCategoriesContainer />}
      taskCategoryToolbarCreateNewButton={taskCategoryToolbarCreateNewButton}
      taskCategoryToolbarActionsMenuTrigger={
        <TaskCategoryToolbarActionsMenuTrigger guestMode={guestMode} />
      }
    />
  );
}
