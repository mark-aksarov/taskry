import { TasksPage } from "./TasksPage";
import { getTasks } from "@/lib/queries/task";
import { TasksPageEmpty } from "./TasksPageEmpty";
import { NewTaskFormContainer } from "@/components/tasks/NewTaskForm";
import { TaskDetailContainerProvider } from "@/components/tasks/TaskDetail";
import { TaskFiltersFormContainer } from "@/components/tasks/TaskFiltersForm";
import { TaskViewModeContainer } from "@/components/tasks/TaskViewModeContainer";
import { TaskCommentsContainerProvider } from "@/components/tasks/TaskCommentsContainer";
import { UpdateSubtasksFormContainerProvider } from "@/components/subtasks/UpdateSubtasksForm";

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
            NewProjectFormContainer={NewTaskFormContainer}
            TaskViewModeContainer={TaskViewModeContainer}
          />
        </UpdateSubtasksFormContainerProvider>
      </TaskCommentsContainerProvider>
    </TaskDetailContainerProvider>
  );
}
