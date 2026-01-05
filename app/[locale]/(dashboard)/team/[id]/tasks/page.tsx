import {
  GlobalContainerProvider,
  GlobalContainerContextType,
} from "@/components/layout/GlobalContainerContext";

import { z } from "zod";
import { getTaskCount } from "@/lib/data/task/task.dal";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { TeamProfileTasksPage } from "./TeamProfileTasksPage";
import { canCreateTask, canDeleteTask } from "@/lib/data/user/user.dal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { TeamProfileTasksPageEmpty } from "./TeamProfileTasksPageEmpty";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { UserTasksContainer } from "@/components/users/UserTasksContainer";
import { UserHeaderContainer } from "@/components/users/UserHeaderContainer";
import { NewTaskFormContainer } from "@/components/tasks/NewTaskFormContainer";
import { TaskCommentsContainer } from "@/components/tasks/TaskCommentsContainer";
import { EditTaskFormContainer } from "@/components/tasks/EditTaskFormContainer";
import { TaskDetailCompactContainer } from "@/components/tasks/TaskDetailCompactContainer";

const searchParamsSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  pageSize: z.coerce.number().int().min(1).max(100).catch(20),
  sort: z.enum(["title", "deadline", "status", "category"]).catch("title"),
});

const context: GlobalContainerContextType = {
  EditTaskFormContainer,
  TaskDetailCompactContainer,
  TaskCommentsContainer,
};

export default async function AppProfileTasksPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string; pageSize?: string; sort?: string }>;
}) {
  // Authorization
  await requireProtectedPage();

  const { id } = await params;

  // Validation
  const rawParams = await searchParams;
  const { page, pageSize, sort } = searchParamsSchema.parse(rawParams);

  // Get count
  const taskCount = await getTaskCount();

  if (!taskCount)
    return (
      <TeamProfileTasksPageEmpty
        userId={id}
        NewTaskFormContainer={NewTaskFormContainer}
        UserHeaderContainer={UserHeaderContainer}
      />
    );

  const canCreate = await canCreateTask();
  const canDelete = await canDeleteTask();

  return (
    <GlobalContainerProvider value={context}>
      <TeamProfileTasksPage
        userId={id}
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
