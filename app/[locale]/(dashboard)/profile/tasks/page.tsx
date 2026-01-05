import {
  GlobalContainerProvider,
  GlobalContainerContextType,
} from "@/components/layout/GlobalContainerContext";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ProfileTasksPage } from "./ProfileTasksPage";
import { getTaskCount } from "@/lib/data/task/task.dal";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { ProfileTasksPageEmpty } from "./ProfileTasksPageEmpty";
import { canCreateTask, canDeleteTask } from "@/lib/data/user/user.dal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { UserTasksContainer } from "@/components/users/UserTasksContainer";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { UserHeaderContainer } from "@/components/users/UserHeaderContainer";
import { NewTaskFormContainer } from "@/components/tasks/NewTaskFormContainer";
import { EditTaskFormContainer } from "@/components/tasks/EditTaskFormContainer";
import { TaskCommentsContainer } from "@/components/tasks/TaskCommentsContainer";
import { TaskDetailCompactContainer } from "@/components/tasks/TaskDetailCompactContainer";

const searchParamsSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  pageSize: z.coerce.number().int().min(1).max(100).catch(10),
  sort: z.enum(["title", "deadline", "status", "category"]).catch("title"),
});

const context: GlobalContainerContextType = {
  EditTaskFormContainer,
  TaskDetailCompactContainer,
  TaskCommentsContainer,
};

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
        NewTaskFormContainer={NewTaskFormContainer}
        UserHeaderContainer={UserHeaderContainer}
      />
    );

  const canCreate = await canCreateTask();
  const canDelete = await canDeleteTask();

  return (
    <GlobalContainerProvider value={context}>
      <ProfileTasksPage
        userId={userId}
        page={page}
        pageSize={pageSize}
        sort={sort}
        canCreateTask={canCreate}
        canDeleteTask={canDelete}
        UserTasksContainer={UserTasksContainer}
        UserHeaderContainer={UserHeaderContainer}
        NewTaskFormContainer={NewTaskFormContainer}
        deleteTasksAction={deleteTasks}
        updateTasksStatusesAction={updateTaskStatuses}
      />
    </GlobalContainerProvider>
  );
}
