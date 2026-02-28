import { z } from "zod";
import { taskSortFields } from "@/lib/types";
import { getTaskList } from "@/lib/data/task/task.dal";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { deleteUser } from "@/lib/actions/user/deleteUser";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { ProfileTasksPageEmpty } from "./ProfileTasksPageEmpty";
import { ProfileActions } from "@/components/users/ProfileActions";
import { changePassword } from "@/lib/actions/user/changePassword";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { pageSearchParam, pageSizeSearchParam } from "@/lib/schemas/base";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { UserTasksContainer } from "@/components/users/UserTasksContainer";
import { UserHeaderContainer } from "@/components/users/UserHeaderContainer";
import { CurrentUserProvider } from "@/components/common/CurrentUserContext";
import { UserTasksPageLayout } from "@/components/users/UserTasksPageLayout";
import { NewTaskFormContainer } from "@/components/tasks/NewTaskFormContainer";
import { SelectedTasksProvider } from "@/components/tasks/SelectedTasksContext";
import { EditUserFormContainer } from "@/components/users/EditUserFormContainer";
import { PageTransitionProvider } from "@/components/common/PageTransitionContext";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";
import { ProfileNavigationDesktop } from "@/components/users/ProfileNavigationDesktop";
import { UpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusContext";

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
  const { items: tasks, totalCount } = await getTaskList({
    page,
    pageSize,
    sort,
    filters: {
      assignee: [session.user.id],
    },
  });

  // Profile actions is used for the current user
  const profileActions = (
    <ProfileActions
      userId={session.user.id}
      userFullName={session.user.name}
      changePassword={changePassword}
      deleteUser={deleteUser}
      editUserFormContainer={<EditUserFormContainer userId={session.user.id} />}
    />
  );

  // Render the page with an empty tasks section.
  if (!totalCount) {
    return (
      <CurrentUserProvider value={currentUserContextValue}>
        <ProfileTasksPageEmpty
          newTaskFormContainer={<NewTaskFormContainer />}
          userHeaderContainer={<UserHeaderContainer userId={session.user.id} />}
          profileActions={profileActions}
        />
      </CurrentUserProvider>
    );
  }

  return (
    <CurrentUserProvider value={currentUserContextValue}>
      <UpdateTaskStatusesProvider updateStatus={updateTaskStatuses}>
        <SelectedTasksProvider
          pageItems={tasks.map((task) => ({
            id: task.id,
            status: task.status,
          }))}
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
              userHeaderContainer={
                <UserHeaderContainer userId={session.user.id} />
              }
              deleteTasks={deleteTasks}
              navigationDesktop={
                <ProfileNavigationDesktop profileActions={profileActions} />
              }
              navigationMobile={<ProfileNavigationMobile />}
            />
          </PageTransitionProvider>
        </SelectedTasksProvider>
      </UpdateTaskStatusesProvider>
    </CurrentUserProvider>
  );
}
