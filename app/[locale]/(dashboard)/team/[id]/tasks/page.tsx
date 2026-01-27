import { z } from "zod";
import { getTaskCount } from "@/lib/data/task/task.dal";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { TeamProfileTasksPageEmpty } from "./TeamProfileTasksPageEmpty";
import { pageSearchParam, pageSizeSearchParam } from "@/lib/schemas/base";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { UserTasksContainer } from "@/components/users/UserTasksContainer";
import { UserTasksPageLayout } from "@/components/users/UserTasksPageLayout";
import { UserHeaderContainer } from "@/components/users/UserHeaderContainer";
import { NewTaskFormContainer } from "@/components/tasks/NewTaskFormContainer";
import { UserNavigationMobile } from "@/components/users/UserNavigationMobile";
import { UserNavigationDesktop } from "@/components/users/UserNavigationDesktop";
import { TaskToolbarActionsMenuTrigger } from "@/components/tasks/TaskToolbarActionsMenuTrigger";

const searchParamsSchema = z.object({
  page: pageSearchParam,
  pageSize: pageSizeSearchParam,
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
        newTaskFormContainer={<NewTaskFormContainer />}
        userHeaderContainer={<UserHeaderContainer userId={id} />}
      />
    );

  return (
    <UserTasksPageLayout
      userTasksContainer={
        <UserTasksContainer
          userId={id}
          page={page}
          pageSize={pageSize}
          sort={sort}
        />
      }
      userHeaderContainer={<UserHeaderContainer userId={id} />}
      taskToolbarActionsMenuTrigger={
        <TaskToolbarActionsMenuTrigger
          deleteAction={deleteTasks}
          updateStatusAction={updateTaskStatuses}
        />
      }
      navigationDesktop={<UserNavigationDesktop />}
      navigationMobile={<UserNavigationMobile />}
    />
  );
}
