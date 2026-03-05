import { z } from "zod";
import { taskSortFields } from "@/lib/types";
import { getTaskList } from "@/lib/data/task/task.dal";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { createTask } from "@/lib/actions/task/createTask";
import { updateUser } from "@/lib/actions/user/updateUser";
import { deleteUser } from "@/lib/actions/user/deleteUser";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { ProfileActions } from "@/components/users/ProfileActions";
import { changePassword } from "@/lib/actions/user/changePassword";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { CreateTaskProvider } from "@/components/tasks/CreateTaskContext";
import { UpdateUserProvider } from "@/components/users/UpdateUserContext";
import { DeleteUserProvider } from "@/components/users/DeleteUserContext";
import { pageSearchParam, pageSizeSearchParam } from "@/lib/schemas/base";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { UserTasksContainer } from "@/components/users/UserTasksContainer";
import { DeleteTasksProvider } from "@/components/tasks/DeleteTasksContext";
import { CurrentUserProvider } from "@/components/common/CurrentUserContext";
import { UserTasksPageLayout } from "@/components/users/UserTasksPageLayout";
import { UserHeaderContainer } from "@/components/users/UserHeaderContainer";
import { NewTaskFormContainer } from "@/components/tasks/NewTaskFormContainer";
import { SelectedTasksProvider } from "@/components/tasks/SelectedTasksContext";
import { EditUserFormContainer } from "@/components/users/EditUserFormContainer";
import { ChangePasswordProvider } from "@/components/users/ChangePasswordContext";
import { PageTransitionProvider } from "@/components/common/PageTransitionContext";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";
import { ProfileNavigationDesktop } from "@/components/users/ProfileNavigationDesktop";
import { UpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusesContext";

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
  const session = await requireProtectedPage();

  // Validation
  const rawParams = await searchParams;
  const { page, pageSize, sort } = searchParamsSchema.parse(rawParams);

  // This data is required to determine the user's role
  // and render the UI accordingly on the client side.
  const currentUserContextValue = {
    isGuest: await hasGuestRole(),
    isOwner: await hasOwnerRole(),
    userId: session.user.id,
  };

  // Get tasks for the current user
  const { items: tasks, totalCount: totalTasksCount } = await getTaskList({
    page,
    pageSize,
    sort,
    filters: {
      assignee: [session.user.id],
    },
  });

  return (
    <CurrentUserProvider value={currentUserContextValue}>
      <UpdateTaskStatusesProvider updateTaskStatuses={updateTaskStatuses}>
        <SelectedTasksProvider
          pageItems={tasks.map((task) => ({
            id: task.id,
            status: task.status,
          }))}
        >
          <PageTransitionProvider>
            <DeleteTasksProvider deleteTasks={deleteTasks}>
              <UpdateUserProvider updateUser={updateUser}>
                <ChangePasswordProvider changePassword={changePassword}>
                  <DeleteUserProvider deleteUser={deleteUser}>
                    <CreateTaskProvider createTask={createTask}>
                      <UserTasksPageLayout
                        totalTasksCount={totalTasksCount}
                        userId={session.user.id}
                        selectedSortField={sort}
                        navigationDesktop={
                          <ProfileNavigationDesktop
                            profileActions={
                              <ProfileActions
                                userId={session.user.id}
                                userFullName={session.user.name}
                              />
                            }
                          />
                        }
                        navigationMobile={<ProfileNavigationMobile />}
                        editUserFormContainer={
                          <EditUserFormContainer userId={session.user.id} />
                        }
                        userTasksContainer={
                          <UserTasksContainer
                            tasks={tasks}
                            totalCount={totalTasksCount}
                            page={page}
                            pageSize={pageSize}
                          />
                        }
                        userHeaderContainer={
                          <UserHeaderContainer userId={session.user.id} />
                        }
                        newTaskFormContainer={
                          <NewTaskFormContainer
                            forcedAssigneeId={session.user.id}
                          />
                        }
                      />
                    </CreateTaskProvider>
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
