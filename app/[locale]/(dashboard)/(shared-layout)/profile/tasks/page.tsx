import { z } from "zod";
import { taskSortFields } from "@/lib/types";
import { getTaskList } from "@/lib/data/task/task.dal";
import { ProfileActions } from "@/components/users/ProfileActions";
import { CreateTaskModal } from "@/components/tasks/CreateTaskModal";
import { UpdateUserModal } from "@/components/users/UpdateUserModal";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
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
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { SelectedTasksProvider } from "@/components/tasks/SelectedTasksContext";
import { ChangePasswordProvider } from "@/components/users/ChangePasswordProvider";
import { ProfileNavigationLarge } from "@/components/users/ProfileNavigationLarge";
import { UpdateUserImageProvider } from "@/components/users/UpdateUserImageProvider";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";
import { CreateTaskFormContainer } from "@/components/tasks/CreateTaskFormContainer";
import { UpdateUserFormContainer } from "@/components/users/UpdateUserFormContainer";
import { ClearUserImageUrlProvider } from "@/components/users/ClearUserImageUrlProvider";
import { UpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusesProvider";
import { UpdateUserImageFileProvider } from "@/components/users/UpdateUserImageFileContext";
import { UserDetailHeaderAltContainer } from "@/components/users/UserDetailHeaderAltContainer";
import { UpdateUserImageModal } from "@/components/users/UpdateUserImageModal";
import { DeleteUserImageModal } from "@/components/users/DeleteUserImageModal";

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
        <ClearUserImageUrlProvider userId={userId}>
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
              </ChangePasswordProvider>
            </UpdateUserProvider>
          </DeleteUserProvider>
        </ClearUserImageUrlProvider>
      </UpdateUserImageProvider>
    </UpdateUserImageFileProvider>
  );
}
