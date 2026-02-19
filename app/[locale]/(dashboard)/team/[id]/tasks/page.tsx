import { z } from "zod";
import { getTaskList } from "@/lib/data/task/task.dal";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { ProfileActions } from "@/components/users/ProfileActions";
import { changePassword } from "@/lib/actions/user/changePassword";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { TeamProfileTasksPageEmpty } from "./TeamProfileTasksPageEmpty";
import { pageSearchParam, pageSizeSearchParam } from "@/lib/schemas/base";
import { ChangePasswordForm } from "@/components/users/ChangePasswordForm";
import { UserTasksContainer } from "@/components/users/UserTasksContainer";
import { UserTasksPageLayout } from "@/components/users/UserTasksPageLayout";
import { UserHeaderContainer } from "@/components/users/UserHeaderContainer";
import { NewTaskFormContainer } from "@/components/tasks/NewTaskFormContainer";
import { UserNavigationMobile } from "@/components/users/UserNavigationMobile";
import { SelectedTasksProvider } from "@/components/tasks/SelectedTasksContext";
import { UserNavigationDesktop } from "@/components/users/UserNavigationDesktop";
import { EditUserFormContainer } from "@/components/users/EditUserFormContainer";
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
  const filters = {
    assignee: [userId],
  };

  const { items: tasks, totalCount } = await getTaskList({
    page,
    pageSize,
    sort,
    filters,
  });

  // Render user actions for the owner, guest, or authenticated user
  const isOwner = await hasOwnerRole();
  const guestMode = await hasGuestRole();

  const isAuthUser = session?.user.id === userId;
  const showUserActions = isOwner || guestMode || isAuthUser;

  const userActions = showUserActions ? (
    <ProfileActions
      guestMode={guestMode}
      changePasswordForm={
        <ChangePasswordForm userId={userId} changePassword={changePassword} />
      }
      editUserFormContainer={<EditUserFormContainer userId={userId} />}
    />
  ) : null;

  // Render the page with an empty tasks section.
  if (!totalCount) {
    return (
      <TeamProfileTasksPageEmpty
        userId={userId}
        userActions={userActions}
        newTaskFormContainer={<NewTaskFormContainer />}
        userHeaderContainer={<UserHeaderContainer userId={userId} />}
      />
    );
  }

  return (
    <SelectedTasksProvider
      pageItems={tasks.map((task) => ({ id: task.id, status: task.status }))}
    >
      <UserTasksPageLayout
        backButton
        userTasksContainer={
          <UserTasksContainer
            tasks={tasks}
            totalCount={totalCount}
            page={page}
            pageSize={pageSize}
          />
        }
        userHeaderContainer={<UserHeaderContainer userId={userId} />}
        taskToolbarActionsMenuTrigger={
          <TaskToolbarActionsMenuTrigger
            guestMode={guestMode}
            deleteTasks={deleteTasks}
          />
        }
        navigationDesktop={<UserNavigationDesktop userActions={userActions} />}
        navigationMobile={<UserNavigationMobile />}
      />
    </SelectedTasksProvider>
  );
}
