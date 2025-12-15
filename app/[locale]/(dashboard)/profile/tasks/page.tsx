import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTaskCount } from "@/lib/queries/task";
import { ProfileTasksPage } from "./ProfileTasksPage";
import { getPageParams } from "@/lib/utils/getPageParams";
import { ProfileTasksPageEmpty } from "./ProfileTasksPageEmpty";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { UserTasksServerContainer } from "@/components/users/UserTasksServerContainer";
import { UserHeaderServerContainer } from "@/components/users/UserHeaderServerContainer";
import { NewTaskFormServerContainer } from "@/components/tasks/NewTaskFormServerContainer";

export default async function AppProfileTasksPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  await requireProtectedPage();

  const params = await searchParams;
  const { page, pageSize } = getPageParams({
    ...params,
    defaultPage: 1,
    defaultPageSize: 10,
  });

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { id: userId } = session!.user;

  const taskCount = await getTaskCount();

  if (!taskCount)
    return (
      <ProfileTasksPageEmpty
        userId={userId}
        UserHeaderContainer={UserHeaderServerContainer}
      />
    );

  return (
    <ProfileTasksPage
      userId={userId}
      page={page}
      pageSize={pageSize}
      UserTasksContainer={UserTasksServerContainer}
      UserHeaderContainer={UserHeaderServerContainer}
      NewTaskFormContainer={NewTaskFormServerContainer}
    />
  );
}
