import {
  EditTaskFormClientContainer,
  EditTaskFormClientContainerProvider,
} from "@/components/tasks/EditTaskFormClientContainerContext";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ProfileTasksPage } from "./ProfileTasksPage";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { getTaskCount } from "@/lib/data/task/task.dal";
import { ProfileTasksPageEmpty } from "./ProfileTasksPageEmpty";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { UserTasksServerContainer } from "@/components/users/UserTasksServerContainer";
import { UserHeaderServerContainer } from "@/components/users/UserHeaderServerContainer";
import { NewTaskFormServerContainer } from "@/components/tasks/NewTaskFormServerContainer";

const searchParamsSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  pageSize: z.coerce.number().int().min(1).max(100).catch(10),
  sort: z.enum(["title", "deadline", "status", "category"]).catch("title"),
});

export default async function AppProfileTasksPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string; sort?: string }>;
}) {
  // Authorization
  await requireProtectedPage();

  // Validation
  const rawParams = await searchParams;
  const { page, pageSize, sort } = searchParamsSchema.parse(rawParams);

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
    <EditTaskFormClientContainerProvider value={EditTaskFormClientContainer}>
      <ProfileTasksPage
        userId={userId}
        page={page}
        pageSize={pageSize}
        sort={sort}
        UserTasksContainer={UserTasksServerContainer}
        UserHeaderContainer={UserHeaderServerContainer}
        NewTaskFormContainer={NewTaskFormServerContainer}
        deleteTasksAction={deleteTasks}
        updateTasksStatusesAction={updateTaskStatuses}
      />
    </EditTaskFormClientContainerProvider>
  );
}
