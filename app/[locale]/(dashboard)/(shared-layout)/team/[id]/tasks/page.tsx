import { z } from "zod";
import { notFound } from "next/navigation";
import { taskSortFields } from "@/lib/types";
import { getTaskList } from "@/lib/data/task/task.dal";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { getUserSummary } from "@/lib/data/user/user.dal";
import { ProfileActions } from "@/components/users/ProfileActions";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { CreateTaskModal } from "@/components/tasks/CreateTaskModal";
import { UpdateUserModal } from "@/components/users/UpdateUserModal";
import { DeleteTasksModal } from "@/components/tasks/DeleteTasksModal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { pageSearchParam, pageSizeSearchParam } from "@/lib/schemas/base";
import { CreateTaskProvider } from "@/components/tasks/CreateTaskProvider";
import { UpdateUserProvider } from "@/components/users/UpdateUserProvider";
import { DeleteUserProvider } from "@/components/users/DeleteUserProvider";
import { UserTasksContainer } from "@/components/users/UserTasksContainer";
import { ChangePasswordModal } from "@/components/users/ChangePasswordModal";
import { DeleteTasksProvider } from "@/components/tasks/DeleteTasksProvider";
import { UserTasksPageLayout } from "@/components/users/UserTasksPageLayout";
import { UserNavigationLarge } from "@/components/users/UserNavigationLarge";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { UserNavigationMobile } from "@/components/users/UserNavigationMobile";
import { SelectedTasksProvider } from "@/components/tasks/SelectedTasksContext";
import { ChangePasswordProvider } from "@/components/users/ChangePasswordProvider";
import { CreateTaskFormContainer } from "@/components/tasks/CreateTaskFormContainer";
import { UpdateUserFormContainer } from "@/components/users/UpdateUserFormContainer";
import { UpdateUserImageProvider } from "@/components/users/UpdateUserImageProvider";
import { ClearUserImageUrlProvider } from "@/components/users/ClearUserImageUrlProvider";
import { UpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusesProvider";
import { UpdateUserImageFileProvider } from "@/components/users/UpdateUserImageFileContext";
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
      assigneeIds: [userId],
    },
  });

  // Show user actions if the user is the owner, guest, or the current user
  const isOwner = await hasOwnerRole();
  const isGuest = await hasGuestRole();
  const showUserActions = isOwner || isGuest || session.user.id === userId;

  return (
    <UpdateUserImageFileProvider>
      <UpdateUserImageProvider>
        <ClearUserImageUrlProvider>
          <DeleteUserProvider>
            <UpdateUserProvider>
              <ChangePasswordProvider>
                <SelectedTasksProvider
                  pageItems={tasks.map((task) => ({
                    id: task.id,
                    status: task.status,
                  }))}
                >
                  <UpdateTaskStatusesProvider>
                    <DeleteTasksProvider>
                      <CreateTaskProvider>
                        <UserTasksPageLayout
                          totalTasksCount={totalTasksCount}
                          selectedSortField={sort}
                          backButton
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
                          userDetailHeaderContainer={
                            <UserDetailHeaderAltContainer userId={userId} />
                          }
                        />

                        <TaskSearchModal
                          searchContainer={
                            <LinkSearchContainer pathname="/tasks" />
                          }
                        />
                        <DeleteTasksModal />
                        <ChangePasswordModal userId={userId} />
                        <CreateTaskModal
                          createTaskFormContainer={
                            <CreateTaskFormContainer
                              forcedAssigneeId={userId}
                            />
                          }
                        />
                        <UpdateUserModal
                          updateUserFormContainer={
                            <UpdateUserFormContainer userId={userId} />
                          }
                        />
                      </CreateTaskProvider>
                    </DeleteTasksProvider>
                  </UpdateTaskStatusesProvider>
                </SelectedTasksProvider>
              </ChangePasswordProvider>
            </UpdateUserProvider>
          </DeleteUserProvider>
        </ClearUserImageUrlProvider>
      </UpdateUserImageProvider>
    </UpdateUserImageFileProvider>
  );
}
