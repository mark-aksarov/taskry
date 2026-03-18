import { z } from "zod";
import { notFound } from "next/navigation";
import { taskSortFields } from "@/lib/types";
import { getTaskList } from "@/lib/data/task/task.dal";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { getUserSummary } from "@/lib/data/user/user.dal";
import { deleteUser } from "@/lib/actions/user/deleteUser";
import { updateUser } from "@/lib/actions/user/updateUser";
import { createTask } from "@/lib/actions/task/createTask";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { ProfileActions } from "@/components/users/ProfileActions";
import { changePassword } from "@/lib/actions/user/changePassword";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { pageSearchParam, pageSizeSearchParam } from "@/lib/schemas/base";
import { CreateTaskProvider } from "@/components/tasks/CreateTaskContext";
import { UpdateUserProvider } from "@/components/users/UpdateUserContext";
import { DeleteUserProvider } from "@/components/users/DeleteUserContext";
import { UserTasksContainer } from "@/components/users/UserTasksContainer";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { DeleteTasksProvider } from "@/components/tasks/DeleteTasksContext";
import { UserTasksPageLayout } from "@/components/users/UserTasksPageLayout";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { NewTaskFormContainer } from "@/components/tasks/NewTaskFormContainer";
import { UserNavigationMobile } from "@/components/users/UserNavigationMobile";
import { SelectedTasksProvider } from "@/components/tasks/SelectedTasksContext";
import { UserNavigationLarge } from "@/components/users/UserNavigationLarge";
import { EditUserFormContainer } from "@/components/users/EditUserFormContainer";
import { ChangePasswordProvider } from "@/components/users/ChangePasswordContext";
import { UpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusesContext";
import { UserDetailHeaderAltContainer } from "@/components/users/UserDetailHeaderAltContainer";

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

  // Show user actions if the user is the owner, guest, or the current user
  const isOwner = await hasOwnerRole();
  const isGuest = await hasGuestRole();
  const showUserActions = isOwner || isGuest || session.user.id === userId;

  return (
    <UpdateTaskStatusesProvider updateTaskStatuses={updateTaskStatuses}>
      <SelectedTasksProvider
        pageItems={tasks.map((task) => ({
          id: task.id,
          status: task.status,
        }))}
      >
        <DeleteTasksProvider deleteTasks={deleteTasks}>
          <UpdateUserProvider updateUser={updateUser}>
            <ChangePasswordProvider changePassword={changePassword}>
              <DeleteUserProvider deleteUser={deleteUser}>
                <CreateTaskProvider createTask={createTask}>
                  <UserTasksPageLayout
                    userId={userId}
                    totalTasksCount={totalTasksCount}
                    selectedSortField={sort}
                    backButton
                    searchContainer={<LinkSearchContainer pathname="/tasks" />}
                    navigationLarge={
                      <UserNavigationLarge
                        userActions={
                          showUserActions && (
                            <ProfileActions
                              userId={userId}
                              userFullName={userSummary.fullName}
                            />
                          )
                        }
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
                    userDetailHeaderContainer={
                      <UserDetailHeaderAltContainer userId={userId} />
                    }
                    newTaskFormContainer={
                      <NewTaskFormContainer forcedAssigneeId={userId} />
                    }
                  />
                </CreateTaskProvider>
              </DeleteUserProvider>
            </ChangePasswordProvider>
          </UpdateUserProvider>
        </DeleteTasksProvider>
      </SelectedTasksProvider>
    </UpdateTaskStatusesProvider>
  );
}
