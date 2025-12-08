import { TasksPage } from "./TasksPage";
import { getTaskList } from "@/lib/queries/task";
import { TasksPageEmpty } from "./TasksPageEmpty";
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";
import { TasksServerContainer } from "@/components/tasks/TasksServerContainer";
import { NewTaskFormServerContainer } from "@/components/tasks/NewTaskFormServerContainer";
import { TaskFiltersFormServerContainer } from "@/components/tasks/TaskFiltersFormServerContainer";

export default async function AppTasksPage() {
  const workspaceId = await getUserWorkspaceId();

  const tasks = await getTaskList({ workspaceId });

  if (!tasks.length) return <TasksPageEmpty />;

  return (
    <TasksPage
      TaskFiltersFormContainer={TaskFiltersFormServerContainer}
      NewTaskFormContainer={NewTaskFormServerContainer}
      TasksServerContainer={TasksServerContainer}
    />
  );
}
