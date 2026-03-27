import { z } from "zod";
import { taskSortFields } from "@/lib/types";
import { getTaskList } from "@/lib/data/task/task.dal";
import { createTask } from "@/lib/actions/task/createTask";
import { deleteUser } from "@/lib/actions/user/deleteUser";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { ProfileActions } from "@/components/users/ProfileActions";
import { changePassword } from "@/lib/actions/user/changePassword";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { CreateTaskProvider } from "@/components/tasks/CreateTaskContext";
import { UpdateUserProvider } from "@/components/users/UpdateUserProvider";
import { DeleteUserProvider } from "@/components/users/DeleteUserProvider";
import { pageSearchParam, pageSizeSearchParam } from "@/lib/schemas/base";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { UserTasksContainer } from "@/components/users/UserTasksContainer";
import { DeleteTasksProvider } from "@/components/tasks/DeleteTasksContext";
import { UserTasksPageLayout } from "@/components/users/UserTasksPageLayout";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { SelectedTasksProvider } from "@/components/tasks/SelectedTasksContext";
import { ChangePasswordProvider } from "@/components/users/ChangePasswordProvider";
import { ProfileNavigationLarge } from "@/components/users/ProfileNavigationLarge";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";
import { CreateTaskFormContainer } from "@/components/tasks/CreateTaskFormContainer";
import { UpdateUserFormContainer } from "@/components/users/UpdateUserFormContainer";
import { UpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusesContext";
import { UserDetailHeaderAltContainer } from "@/components/users/UserDetailHeaderAltContainer";

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
    <UpdateTaskStatusesProvider updateTaskStatuses={updateTaskStatuses}>
      <SelectedTasksProvider
        pageItems={tasks.map((task) => ({
          id: task.id,
          status: task.status,
        }))}
      >
        <DeleteTasksProvider deleteTasks={deleteTasks}>
          <UpdateUserProvider>
            <ChangePasswordProvider>
              <DeleteUserProvider>
                <CreateTaskProvider createTask={createTask}>
                  <UserTasksPageLayout
                    totalTasksCount={totalTasksCount}
                    userId={userId}
                    selectedSortField={sort}
                    navigationLarge={
                      <ProfileNavigationLarge
                        profileActions={
                          <ProfileActions
                            userId={userId}
                            userFullName={userFullName}
                          />
                        }
                      />
                    }
                    searchContainer={<LinkSearchContainer pathname="/tasks" />}
                    navigationMobile={<ProfileNavigationMobile />}
                    updateUserFormContainer={
                      <UpdateUserFormContainer userId={userId} />
                    }
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
                    createTaskFormContainer={
                      <CreateTaskFormContainer forcedAssigneeId={userId} />
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
