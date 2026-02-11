import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { TaskCategoriesPage } from "./TaskCategoriesPage";
import { getTaskCount } from "@/lib/data/task/task.dal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { createTaskCategory } from "@/lib/actions/taskCategory/createTaskCategory";
import { NewTaskCategoryForm } from "@/components/taskCategory/NewTaskCategoryForm";
import { TaskCategoriesContainer } from "@/components/taskCategory/TaskCategoriesContainer";
import { TaskCategoryToolbarCreateNewButton } from "@/components/taskCategory/TaskCategoryToolbarCreateNewButton";
import { TaskCategoryToolbarActionsMenuTrigger } from "@/components/taskCategory/TaskCategoryToolbarActionsMenuTrigger";
import { TaskCategoriesPageEmpty } from "./TaskCategoriesPageEmpty";

export default async function AppTaskCategoriesPage() {
  // Authorization
  await requireProtectedPage();

  // Get count
  const taskCount = await getTaskCount();
  const guestMode = await hasGuestRole();

  const taskCategoryToolbarCreateNewButton = (
    <TaskCategoryToolbarCreateNewButton
      guestMode={guestMode}
      newTaskCategoryForm={
        <NewTaskCategoryForm createTaskCategory={createTaskCategory} />
      }
    />
  );

  if (!taskCount) {
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
      taskToolbarActionsMenuTrigger={
        <TaskCategoryToolbarActionsMenuTrigger guestMode={guestMode} />
      }
    />
  );
}
