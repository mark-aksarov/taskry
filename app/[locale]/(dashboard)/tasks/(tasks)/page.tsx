import { TasksPage } from "./TasksPage";
import { getTaskCount } from "@/lib/queries/task";
import { TasksPageEmpty } from "./TasksPageEmpty";
import { getPageParams } from "@/lib/utils/getPageParams";
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";
import { TasksServerContainer } from "@/components/tasks/TasksServerContainer";
import { NewTaskFormServerContainer } from "@/components/tasks/NewTaskFormServerContainer";
import { TaskFiltersFormServerContainer } from "@/components/tasks/TaskFiltersFormServerContainer";

export default async function AppTasksPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  const params = await searchParams;
  const { page, pageSize } = getPageParams(params);
  const workspaceId = await getUserWorkspaceId();
  const taskCount = await getTaskCount({ workspaceId });

  if (!taskCount) return <TasksPageEmpty />;

  return (
    <TasksPage
      page={page}
      pageSize={pageSize}
      TaskFiltersFormContainer={TaskFiltersFormServerContainer}
      NewTaskFormContainer={NewTaskFormServerContainer}
      TasksServerContainer={TasksServerContainer}
    />
  );
}
