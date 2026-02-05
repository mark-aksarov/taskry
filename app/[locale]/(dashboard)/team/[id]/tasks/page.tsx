import { z } from "zod";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { getTaskCount } from "@/lib/data/task/task.dal";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { ProfileActions } from "@/components/users/ProfileActions";
import { changePassword } from "@/lib/actions/user/changePassword";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { TeamProfileTasksPageEmpty } from "./TeamProfileTasksPageEmpty";
import { pageSearchParam, pageSizeSearchParam } from "@/lib/schemas/base";
import { ChangePasswordForm } from "@/components/users/ChangePasswordForm";
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
  const session = await requireProtectedPage();

  const { id: userId } = await params;

  // Validation
  const rawParams = await searchParams;
  const { page, pageSize, sort } = searchParamsSchema.parse(rawParams);

  // Get count
  const taskCount = await getTaskCount();

  const isOwner = await hasOwnerRole();
  const guestMode = await hasGuestRole();

  const userActions = (
    <ProfileActions
      guestMode={guestMode}
      changePasswordForm={
        <ChangePasswordForm userId={userId} changePassword={changePassword} />
      }
    />
  );

  const isAuthUser = session?.user.id === userId;
  const showUserActions = isOwner || guestMode || isAuthUser;

  if (!taskCount)
    return (
      <TeamProfileTasksPageEmpty
        userId={userId}
        userActions={showUserActions && userActions}
        newTaskFormContainer={<NewTaskFormContainer />}
        userHeaderContainer={<UserHeaderContainer userId={userId} />}
      />
    );

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
      navigationDesktop={
        <UserNavigationDesktop userActions={showUserActions && userActions} />
      }
      navigationMobile={<UserNavigationMobile />}
    />
  );
}
