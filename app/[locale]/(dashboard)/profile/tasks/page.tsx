import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { taskSortFields } from "@/lib/types";
import { getTaskList } from "@/lib/data/task/task.dal";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { ProfileTasksPageEmpty } from "./ProfileTasksPageEmpty";
import { ProfileActions } from "@/components/users/ProfileActions";
import { changePassword } from "@/lib/actions/user/changePassword";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { pageSearchParam, pageSizeSearchParam } from "@/lib/schemas/base";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { UserTasksContainer } from "@/components/users/UserTasksContainer";
import { ChangePasswordForm } from "@/components/users/ChangePasswordForm";
import { UserHeaderContainer } from "@/components/users/UserHeaderContainer";
import { UserTasksPageLayout } from "@/components/users/UserTasksPageLayout";
import { NewTaskFormContainer } from "@/components/tasks/NewTaskFormContainer";
import { SelectedTasksProvider } from "@/components/tasks/SelectedTasksContext";
import { EditUserFormContainer } from "@/components/users/EditUserFormContainer";
import { PageTransitionProvider } from "@/components/common/PageTransitionContext";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";
import { ProfileNavigationDesktop } from "@/components/users/ProfileNavigationDesktop";
import { UpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusContext";
import { TaskToolbarActionsMenuTrigger } from "@/components/tasks/TaskToolbarActionsMenuTrigger";

const searchParamsSchema = z.object({
  page: pageSearchParam,
  pageSize: pageSizeSearchParam,
  sort: z.enum(taskSortFields).catch("createdAt"),
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

  const filters = {
    assignee: [userId],
  };

  const { items: tasks, totalCount } = await getTaskList({
    page,
    pageSize,
    sort,
    filters,
  });

  const guestMode = await hasGuestRole();

  const profileActions = (
    <ProfileActions
      guestMode={guestMode}
      changePasswordForm={
        <ChangePasswordForm userId={userId} changePassword={changePassword} />
      }
      editUserFormContainer={<EditUserFormContainer userId={userId} />}
    />
  );

  // Render the page with an empty tasks section.
  if (!totalCount) {
    return (
      <ProfileTasksPageEmpty
        profileActions={profileActions}
        newTaskFormContainer={<NewTaskFormContainer />}
        userHeaderContainer={<UserHeaderContainer userId={userId} />}
      />
    );
  }

  return (
    <UpdateTaskStatusesProvider updateStatus={updateTaskStatuses}>
      <SelectedTasksProvider
        pageItems={tasks.map((task) => ({ id: task.id, status: task.status }))}
      >
        <PageTransitionProvider>
          <UserTasksPageLayout
            selectedSortField={sort}
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
            navigationDesktop={
              <ProfileNavigationDesktop profileActions={profileActions} />
            }
            navigationMobile={<ProfileNavigationMobile />}
          />
        </PageTransitionProvider>
      </SelectedTasksProvider>
    </UpdateTaskStatusesProvider>
  );
}
