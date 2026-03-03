import { z } from "zod";
import { notFound } from "next/navigation";
import { taskSortFields } from "@/lib/types";
import { getTaskList } from "@/lib/data/task/task.dal";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { getUserSummary } from "@/lib/data/user/user.dal";
import { deleteUser } from "@/lib/actions/user/deleteUser";
import { updateUser } from "@/lib/actions/user/updateUser";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { changePassword } from "@/lib/actions/user/changePassword";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { UpdateUserProvider } from "@/components/users/UpdateUserContext";
import { pageSearchParam, pageSizeSearchParam } from "@/lib/schemas/base";
import { DeleteUserProvider } from "@/components/users/DeleteUserContext";
import { UserTasksContainer } from "@/components/users/UserTasksContainer";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { DeleteTasksProvider } from "@/components/tasks/DeleteTasksContext";
import { CurrentUserProvider } from "@/components/common/CurrentUserContext";
import { UserTasksPageLayout } from "@/components/users/UserTasksPageLayout";
import { UserHeaderContainer } from "@/components/users/UserHeaderContainer";
import { NewTaskFormContainer } from "@/components/tasks/NewTaskFormContainer";
import { UserNavigationMobile } from "@/components/users/UserNavigationMobile";
import { SelectedTasksProvider } from "@/components/tasks/SelectedTasksContext";
import { UserNavigationDesktop } from "@/components/users/UserNavigationDesktop";
import { EditUserFormContainer } from "@/components/users/EditUserFormContainer";
import { ChangePasswordProvider } from "@/components/users/ChangePasswordContext";
import { PageTransitionProvider } from "@/components/common/PageTransitionContext";
import { UpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusesContext";

const searchParamsSchema = z.object({
  page: pageSearchParam,
  pageSize: pageSizeSearchParam,
  sort: z.enum(taskSortFields).catch("createdAt"),
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

  // Validation
  const { id: userId } = await params;
  const rawParams = await searchParams;
  const { page, pageSize, sort } = searchParamsSchema.parse(rawParams);

  // Get user summary
  const userSummary = await getUserSummary(userId);

  if (!userSummary) {
    notFound();
  }

  // Get tasks for specific user
  const { items: tasks, totalCount: totalTasksCount } = await getTaskList({
    page,
    pageSize,
    sort,
    filters: {
      assignee: [userId],
    },
  });

  // This data is required to determine the user's role
  // and render the UI accordingly on the client side.
  const isOwner = await hasOwnerRole();
  const isGuest = await hasGuestRole();

  const currentUserContextValue = {
    isGuest,
    isOwner,
    userId: session.user.id,
  };

  // Show user actions if the user is the owner, guest, or the current user
  const showUserActions = isOwner || isGuest || session.user.id === userId;

  return (
    <CurrentUserProvider value={currentUserContextValue}>
      <UpdateTaskStatusesProvider>
        <SelectedTasksProvider
          pageItems={tasks.map((task) => ({
            id: task.id,
            status: task.status,
          }))}
        >
          <PageTransitionProvider>
            <DeleteTasksProvider>
              <UpdateUserProvider updateUser={updateUser}>
                <ChangePasswordProvider changePassword={changePassword}>
                  <DeleteUserProvider deleteUser={deleteUser}>
                    <UserTasksPageLayout
                      userId={userId}
                      totalTasksCount={totalTasksCount}
                      selectedSortField={sort}
                      backButton
                      navigationDesktop={
                        <UserNavigationDesktop
                          showUserActions={showUserActions}
                          userId={userId}
                          userFullName={userSummary.fullName}
                        />
                      }
                      navigationMobile={<UserNavigationMobile />}
                      userTasksContainer={
                        <UserTasksContainer
                          tasks={tasks}
                          totalCount={totalTasksCount}
                          page={page}
                          pageSize={pageSize}
                        />
                      }
                      editUserFormContainer={
                        <EditUserFormContainer userId={userId} />
                      }
                      userHeaderContainer={
                        <UserHeaderContainer userId={userId} />
                      }
                      newTaskFormContainer={<NewTaskFormContainer />}
                      deleteTasks={deleteTasks}
                      updateTaskStatuses={updateTaskStatuses}
                    />
                  </DeleteUserProvider>
                </ChangePasswordProvider>
              </UpdateUserProvider>
            </DeleteTasksProvider>
          </PageTransitionProvider>
        </SelectedTasksProvider>
      </UpdateTaskStatusesProvider>
    </CurrentUserProvider>
  );
}
