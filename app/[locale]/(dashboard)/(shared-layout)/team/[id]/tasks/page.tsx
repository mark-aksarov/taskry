import { z } from "zod";
import { notFound } from "next/navigation";
import { taskSortFields } from "@/lib/types";
import { getTaskList } from "@/lib/data/task/task.dal";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { getUserSummary } from "@/lib/data/user/user.dal";
import { ProfileActions } from "@/dashboard/users/ProfileActions";
import { TaskSearchModal } from "@/dashboard/tasks/TaskSearchModal";
import { CreateTaskModal } from "@/dashboard/tasks/CreateTaskModal";
import { UpdateUserModal } from "@/dashboard/users/UpdateUserModal";
import { DeleteTasksModal } from "@/dashboard/tasks/DeleteTasksModal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { pageSearchParam, pageSizeSearchParam } from "@/lib/schemas/base";
import { CreateTaskProvider } from "@/dashboard/tasks/CreateTaskProvider";
import { UpdateUserProvider } from "@/dashboard/users/UpdateUserProvider";
import { DeleteUserProvider } from "@/dashboard/users/DeleteUserProvider";
import { UserTasksContainer } from "@/dashboard/users/UserTasksContainer";
import { ChangePasswordModal } from "@/dashboard/users/ChangePasswordModal";
import { DeleteTasksProvider } from "@/dashboard/tasks/DeleteTasksProvider";
import { UserTasksPageLayout } from "@/dashboard/users/UserTasksPageLayout";
import { UserNavigationLarge } from "@/dashboard/users/UserNavigationLarge";
import { LinkSearchContainer } from "@/dashboard/common/LinkSearchContainer";
import { UserNavigationMobile } from "@/dashboard/users/UserNavigationMobile";
import { UpdateUserImageModal } from "@/dashboard/users/UpdateUserImageModal";
import { DeleteUserImageModal } from "@/dashboard/users/DeleteUserImageModal";
import { SelectedTasksProvider } from "@/dashboard/tasks/SelectedTasksContext";
import { ChangePasswordProvider } from "@/dashboard/users/ChangePasswordProvider";
import { CreateTaskFormContainer } from "@/dashboard/tasks/CreateTaskFormContainer";
import { UpdateUserFormContainer } from "@/dashboard/users/UpdateUserFormContainer";
import { UpdateUserImageProvider } from "@/dashboard/users/UpdateUserImageProvider";
import { ClearUserImageUrlProvider } from "@/dashboard/users/ClearUserImageUrlProvider";
import { UpdateTaskStatusesProvider } from "@/dashboard/tasks/UpdateTaskStatusesProvider";
import { UpdateUserImageFileProvider } from "@/dashboard/users/UpdateUserImageFileContext";
import { UserDetailHeaderAltContainer } from "@/dashboard/users/UserDetailHeaderAltContainer";

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
                                  <ProfileActions userId={userId} />
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
                        <UpdateUserImageModal userId={userId} />
                        <DeleteUserImageModal
                          userId={userId}
                          userFullName={userSummary.fullName}
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
