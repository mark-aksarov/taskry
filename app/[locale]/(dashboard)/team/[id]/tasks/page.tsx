import { getTaskCount } from "@/lib/queries/task";
import { getPageParams } from "@/lib/utils/getPageParams";
import { TeamProfileTasksPage } from "./TeamProfileTasksPage";
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";
import { TeamProfileTasksPageEmpty } from "./TeamProfileTasksPageEmpty";
import { UserTasksServerContainer } from "@/components/users/UserTasksServerContainer";
import { UserHeaderServerContainer } from "@/components/users/UserHeaderServerContainer";
import { NewTaskFormServerContainer } from "@/components/tasks/NewTaskFormServerContainer";

export default async function AppProfileTasksPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const { page, pageSize } = getPageParams({
    ...query,
    defaultPage: 1,
    defaultPageSize: 10,
  });
  const workspaceId = await getUserWorkspaceId();
  const taskCount = await getTaskCount({ workspaceId });

  if (!taskCount)
    return (
      <TeamProfileTasksPageEmpty
        userId={id}
        UserHeaderContainer={UserHeaderServerContainer}
      />
    );

  return (
    <TeamProfileTasksPage
      userId={id}
      page={page}
      pageSize={pageSize}
      UserTasksContainer={UserTasksServerContainer}
      UserHeaderContainer={UserHeaderServerContainer}
      NewTaskFormContainer={NewTaskFormServerContainer}
    />
  );
}
