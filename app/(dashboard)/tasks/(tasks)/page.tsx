import { TasksPage } from "./TasksPage";
import { getTaskList } from "@/lib/queries/task";
import { TasksPageEmpty } from "./TasksPageEmpty";
import { TasksServerContainer } from "@/components/tasks/TasksServerContainer";
import { NewTaskFormServerContainer } from "@/components/tasks/NewTaskFormServerContainer";
import { TaskFiltersFormServerContainer } from "@/components/tasks/TaskFiltersFormServerContainer";

export default async function AppTasksPage() {
  const tasks = await getTaskList();

  if (!tasks.length) return <TasksPageEmpty />;

  return (
    <TasksPage
      TaskFiltersFormContainer={TaskFiltersFormServerContainer}
      NewTaskFormContainer={NewTaskFormServerContainer}
      TasksServerContainer={TasksServerContainer}
    />
  );
}
