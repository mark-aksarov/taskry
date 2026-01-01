import { z } from "zod";
import { getTaskCount } from "@/lib/data/task/task.dal";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { TeamProfileTasksPage } from "./TeamProfileTasksPage";
import { canCreateTask, canDeleteTask } from "@/lib/data/user/user.dal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { TeamProfileTasksPageEmpty } from "./TeamProfileTasksPageEmpty";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { UserTasksServerContainer } from "@/components/users/UserTasksServerContainer";
import { UserHeaderServerContainer } from "@/components/users/UserHeaderServerContainer";
import { NewTaskFormServerContainer } from "@/components/tasks/NewTaskFormServerContainer";
import { EditTaskFormClientContainer } from "@/components/tasks/EditTaskFormClientContainer";
import { EditTaskFormClientContainerProvider } from "@/components/tasks/EditTaskFormClientContainerContext";

const searchParamsSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  pageSize: z.coerce.number().int().min(1).max(100).catch(20),
  sort: z.enum(["title", "deadline", "status", "category"]).catch("title"),
});

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
        UserHeaderContainer={UserHeaderServerContainer}
      />
    );

  const canCreate = await canCreateTask();
  const canDelete = await canDeleteTask();

  return (
    <EditTaskFormClientContainerProvider value={EditTaskFormClientContainer}>
      <TeamProfileTasksPage
        userId={id}
        page={page}
        pageSize={pageSize}
        sort={sort}
        canCreateTask={canCreate}
        canDeleteTask={canDelete}
        UserTasksContainer={UserTasksServerContainer}
        UserHeaderContainer={UserHeaderServerContainer}
        NewTaskFormContainer={NewTaskFormServerContainer}
        deleteTasksAction={deleteTasks}
        updateTasksStatusesAction={updateTaskStatuses}
      />
    </EditTaskFormClientContainerProvider>
  );
}
