import { TasksPage } from "./TasksPage";
import { getTasks } from "@/lib/queries/task";
import { TasksPageEmpty } from "./TasksPageEmpty";
import { NewTaskFormContainer } from "@/components/tasks/NewTaskForm";
import { TaskDetailContainerProvider } from "@/components/tasks/TaskDetail";
import { TaskViewModeContainer } from "@/components/tasks/TaskViewModeContainer";
import { TaskFiltersFormContainer } from "@/components/tasks/TaskFiltersForm/TaskFiltersFormContainer";
import { TaskCommentsContainerProvider } from "@/components/tasks/TaskCommentsContainer";
import { UpdateSubtasksFormContainerProvider } from "@/components/subtasks/UpdateSubtasksForm/UpdateSubtasksFormContainerContext";

export default async function AppTasksPage() {
  const tasks = await getTasks();

  if (!tasks) return <TasksPageEmpty />;

  return (
    <TaskDetailContainerProvider>
      <TaskCommentsContainerProvider>
        <UpdateSubtasksFormContainerProvider>
          <TasksPage
            TaskFiltersFormContainer={TaskFiltersFormContainer}
            NewTaskFormContainer={NewTaskFormContainer}
            TaskViewModeContainer={TaskViewModeContainer}
          />
        </UpdateSubtasksFormContainerProvider>
      </TaskCommentsContainerProvider>
    </TaskDetailContainerProvider>
  );
}
