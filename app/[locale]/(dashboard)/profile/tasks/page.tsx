import { z } from "zod";
import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTaskCount } from "@/lib/data/task/task.dal";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { ProfileTasksPageEmpty } from "./ProfileTasksPageEmpty";
import { TaskFormBaseSkeleton } from "@/components/tasks/TaskFormBase";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { UserTasksContainer } from "@/components/users/UserTasksContainer";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { UserHeaderContainer } from "@/components/users/UserHeaderContainer";
import { UserTasksPageLayout } from "@/components/users/UserTasksPageLayout";
import { NewTaskFormContainer } from "@/components/tasks/NewTaskFormContainer";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";
import { ProfileNavigationDesktop } from "@/components/users/ProfileNavigationDesktop";
import { TaskToolbarActionsMenuTrigger } from "@/components/tasks/TaskToolbarActionsMenuTrigger";

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

  if (!taskCount) {
    return (
      <ProfileTasksPageEmpty
        userId={userId}
        newTaskFormContainer={
          <Suspense fallback={<TaskFormBaseSkeleton />}>
            <NewTaskFormContainer />
          </Suspense>
        }
        userHeaderContainer={<UserHeaderContainer userId={userId} />}
      />
    );
  }

  return (
    <UserTasksPageLayout
      userTasksContainer={
        <UserTasksContainer
          userId={userId}
          page={page}
          pageSize={pageSize}
          sort={sort}
        />
      }
      userHeaderContainer={<UserHeaderContainer userId={userId} />}
      taskToolbarActionsMenuTrigger={
        <TaskToolbarActionsMenuTrigger
          deleteAction={deleteTasks}
          updateStatusAction={updateTaskStatuses}
        />
      }
      navigationDesktop={<ProfileNavigationDesktop />}
      navigationMobile={<ProfileNavigationMobile />}
    />
  );
}
