import { z } from "zod";
import { taskSortFields } from "@/lib/types";
import { getTaskList } from "@/lib/data/task/task.dal";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { ProfileActions } from "@/dashboard/users/ProfileActions";
import { CreateTaskModal } from "@/dashboard/tasks/CreateTaskModal";
import { UpdateUserModal } from "@/dashboard/users/UpdateUserModal";
import { TaskSearchModal } from "@/dashboard/tasks/TaskSearchModal";
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
import { LinkSearchContainer } from "@/dashboard/common/LinkSearchContainer";
import { UpdateUserImageModal } from "@/dashboard/users/UpdateUserImageModal";
import { DeleteUserImageModal } from "@/dashboard/users/DeleteUserImageModal";
import { SelectedTasksProvider } from "@/dashboard/tasks/SelectedTasksContext";
import { ChangePasswordProvider } from "@/dashboard/users/ChangePasswordProvider";
import { ProfileNavigationLarge } from "@/dashboard/users/ProfileNavigationLarge";
import { UpdateUserImageProvider } from "@/dashboard/users/UpdateUserImageProvider";
import { ProfileNavigationMobile } from "@/dashboard/users/ProfileNavigationMobile";
import { CreateTaskFormContainer } from "@/dashboard/tasks/CreateTaskFormContainer";
import { UpdateUserFormContainer } from "@/dashboard/users/UpdateUserFormContainer";
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
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string; sort?: string }>;
}) {
  // Authorization
  const session = await requireProtectedPage();

  const userId = session.user.id;
  const userFullName = session.user.name;

  // Validation
  const rawParams = await searchParams;
  const { page, pageSize, sort } = searchParamsSchema.parse(rawParams);

  // Get tasks for the current user
  const { items: tasks, totalCount: totalTasksCount } = await getTaskList({
    page,
    pageSize,
    sort,
    filters: {
      assigneeIds: [userId],
    },
  });

  return (
    <UpdateUserImageFileProvider>
      <UpdateUserImageProvider>
        <ClearUserImageUrlProvider>
          <DeleteUserProvider>
            <UpdateUserProvider>
              <ChangePasswordProvider>
                <ViewModeProvider>
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
                            navigationLarge={
                              <ProfileNavigationLarge
                                profileActions={
                                  <ProfileActions userId={userId} />
                                }
                              />
                            }
                            navigationMobile={<ProfileNavigationMobile />}
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
                            userFullName={userFullName}
                          />
                        </CreateTaskProvider>
                      </DeleteTasksProvider>
                    </UpdateTaskStatusesProvider>
                  </SelectedTasksProvider>
                </ViewModeProvider>
              </ChangePasswordProvider>
            </UpdateUserProvider>
          </DeleteUserProvider>
        </ClearUserImageUrlProvider>
      </UpdateUserImageProvider>
    </UpdateUserImageFileProvider>
  );
}
