import { getTaskList } from "@/lib/queries/task";
import { TeamProfileTasksPage } from "./TeamProfileTasksPage";
import { TeamProfileTasksPageEmpty } from "./TeamProfileTasksPageEmpty";
import { UserTasksServerContainer } from "@/components/users/UserTasksServerContainer";
import { UserHeaderServerContainer } from "@/components/users/UserHeaderServerContainer";
import { NewTaskFormServerContainer } from "@/components/tasks/NewTaskFormServerContainer";

export default async function AppProfileTasksPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tasks = await getTaskList(id);

  if (!tasks.length)
    return (
      <TeamProfileTasksPageEmpty
        userId={id}
        UserHeaderContainer={UserHeaderServerContainer}
      />
    );

  return (
    <TeamProfileTasksPage
      userId={id}
      UserTasksContainer={UserTasksServerContainer}
      UserHeaderContainer={UserHeaderServerContainer}
      NewTaskFormContainer={NewTaskFormServerContainer}
    />
  );
}
