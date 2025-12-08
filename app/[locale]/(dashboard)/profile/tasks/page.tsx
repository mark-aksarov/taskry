import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTaskList } from "@/lib/queries/task";
import { ProfileTasksPage } from "./ProfileTasksPage";
import { ProfileTasksPageEmpty } from "./ProfileTasksPageEmpty";
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";
import { UserTasksServerContainer } from "@/components/users/UserTasksServerContainer";
import { UserHeaderServerContainer } from "@/components/users/UserHeaderServerContainer";
import { NewTaskFormServerContainer } from "@/components/tasks/NewTaskFormServerContainer";

export default async function AppProfileTasksPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const { id: userId } = session!.user;

  const workspaceId = await getUserWorkspaceId();

  const tasks = await getTaskList({
    workspaceId,
    assigneeId: userId,
  });

  if (!tasks.length)
    return (
      <ProfileTasksPageEmpty
        userId={userId}
        UserHeaderContainer={UserHeaderServerContainer}
      />
    );

  return (
    <ProfileTasksPage
      userId={userId}
      UserTasksContainer={UserTasksServerContainer}
      UserHeaderContainer={UserHeaderServerContainer}
      NewTaskFormContainer={NewTaskFormServerContainer}
    />
  );
}
