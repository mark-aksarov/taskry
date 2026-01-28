import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTaskCount } from "@/lib/data/task/task.dal";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { ProfileTasksPageEmpty } from "./ProfileTasksPageEmpty";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { pageSearchParam, pageSizeSearchParam } from "@/lib/schemas/base";
import { UserTasksContainer } from "@/components/users/UserTasksContainer";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { UserHeaderContainer } from "@/components/users/UserHeaderContainer";
import { UserTasksPageLayout } from "@/components/users/UserTasksPageLayout";
import { NewTaskFormContainer } from "@/components/tasks/NewTaskFormContainer";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";
import { ProfileNavigationDesktop } from "@/components/users/ProfileNavigationDesktop";
import { TaskToolbarActionsMenuTrigger } from "@/components/tasks/TaskToolbarActionsMenuTrigger";

const searchParamsSchema = z.object({
  page: pageSearchParam,
  pageSize: pageSizeSearchParam,
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
  const guestMode = await hasGuestRole();

  if (!taskCount) {
    return (
      <ProfileTasksPageEmpty
        userId={userId}
        newTaskFormContainer={<NewTaskFormContainer />}
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
          guestMode={guestMode}
          deleteAction={deleteTasks}
          updateStatusAction={updateTaskStatuses}
        />
      }
      navigationDesktop={<ProfileNavigationDesktop />}
      navigationMobile={<ProfileNavigationMobile />}
    />
  );
}
