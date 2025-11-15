import { TasksPage } from "./TasksPage";
import { getTasks } from "@/lib/queries/task";
import { TasksPageEmpty } from "./TasksPageEmpty";
import { NewTaskFormContainer } from "@/components/tasks/NewTaskForm";
import { TaskDetailContainerProvider } from "@/components/tasks/TaskDetail";
import { TaskViewModeContainer } from "@/components/tasks/TaskViewModeContainer";
import { CommentsContainerProvider } from "@/components/comments/CommentsContainer";
import { TaskFiltersFormContainer } from "@/components/tasks/TaskFiltersForm/TaskFiltersFormContainer";

export default async function AppTasksPage() {
  const tasks = await getTasks();

  if (!tasks) return <TasksPageEmpty />;

  return (
    <TaskDetailContainerProvider>
      <CommentsContainerProvider>
        <TasksPage
          TaskFiltersFormContainer={TaskFiltersFormContainer}
          NewTaskFormContainer={NewTaskFormContainer}
          TaskViewModeContainer={TaskViewModeContainer}
        />
      </CommentsContainerProvider>
    </TaskDetailContainerProvider>
  );
}
