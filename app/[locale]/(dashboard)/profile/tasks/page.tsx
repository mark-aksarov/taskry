import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTaskCount } from "@/lib/dal/task";
import { ProfileTasksPage } from "./ProfileTasksPage";
import { deleteTasks } from "@/lib/actions/deleteTasks";
import { ProfileTasksPageEmpty } from "./ProfileTasksPageEmpty";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { UserTasksServerContainer } from "@/components/users/UserTasksServerContainer";
import { UserHeaderServerContainer } from "@/components/users/UserHeaderServerContainer";
import { NewTaskFormServerContainer } from "@/components/tasks/NewTaskFormServerContainer";

const searchParamsSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  pageSize: z.coerce.number().int().min(1).max(100).catch(10),
});

export default async function AppProfileTasksPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  // Authorization
  await requireProtectedPage();

  // Validation
  const rawParams = await searchParams;
  const { page, pageSize } = searchParamsSchema.parse(rawParams);

  // Get data
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
      deleteTasksAction={deleteTasks}
    />
  );
}
