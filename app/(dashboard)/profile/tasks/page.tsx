import { getTaskList } from "@/lib/queries/task";
import { ProfileTasksPage } from "./ProfileTasksPage";
import { ProfileTasksPageEmpty } from "./ProfileTasksPageEmpty";
import { UserTasksServerContainer } from "@/components/users/UserTasksServerContainer";
import { UserHeaderServerContainer } from "@/components/users/UserHeaderServerContainer";
import { NewTaskFormServerContainer } from "@/components/tasks/NewTaskFormServerContainer";

export default async function AppProfileTasksPage() {
  const id = "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI";
  const tasks = await getTaskList(id);

  if (!tasks.length)
    return (
      <ProfileTasksPageEmpty
        userId={id}
        UserHeaderContainer={UserHeaderServerContainer}
      />
    );

  return (
    <ProfileTasksPage
      userId={id}
      UserTasksContainer={UserTasksServerContainer}
      UserHeaderContainer={UserHeaderServerContainer}
      NewTaskFormContainer={NewTaskFormServerContainer}
    />
  );
}
