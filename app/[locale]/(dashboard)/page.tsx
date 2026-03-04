import { z } from "zod";
import { DashboardPage } from "./DashboardPage";
import { getTaskList } from "@/lib/data/task/task.dal";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { pageSearchParam, pageSizeSearchParam } from "@/lib/schemas/base";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { DeleteTasksProvider } from "@/components/tasks/DeleteTasksContext";
import { CurrentUserProvider } from "@/components/common/CurrentUserContext";
import { SelectedTasksProvider } from "@/components/tasks/SelectedTasksContext";
import { PageTransitionProvider } from "@/components/common/PageTransitionContext";
import { AssignedTasksContainer } from "@/components/tasks/AssignedTasksContainer";
import { TotalTasksCardContainer } from "@/components/tasks/TotalTasksCardContainer";
import { TotalUsersCardContainer } from "@/components/users/TotalUsersCardContainer";
import { UpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusesContext";
import { defaultAppHeaderSlots } from "@/components/layout/AppHeader/defaultAppHeaderSlots";
import { TotalProjectsCardContainer } from "@/components/projects/TotalProjectsCardContainer";
import { TotalCustomersCardContainer } from "@/components/customer/TotalCustomersCardContainer";

const searchParamsSchema = z.object({
  page: pageSearchParam,
  pageSize: pageSizeSearchParam,
});

export default async function AppDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  // Authorization
  const session = await requireProtectedPage();

  // Validation
  const rawParams = await searchParams;
  const { page, pageSize } = searchParamsSchema.parse(rawParams);

  // Get tasks for the current user
  const { items: tasks, totalCount } = await getTaskList({
    page,
    pageSize,
    sort: "createdAt",
    filters: {
      assignee: [session.user.id],
    },
  });

  // This data is required to determine the user's role
  // and render the UI accordingly on the client side.
  const currentUserContextValue = {
    isGuest: await hasGuestRole(),
    isOwner: await hasOwnerRole(),
    userId: session.user.id,
  };

  return (
    <UpdateTaskStatusesProvider updateTaskStatuses={updateTaskStatuses}>
      <SelectedTasksProvider
        pageItems={tasks.map((t) => ({ id: t.id, status: t.status }))}
      >
        <PageTransitionProvider>
          <CurrentUserProvider value={currentUserContextValue}>
            <DeleteTasksProvider deleteTasks={deleteTasks}>
              <DashboardPage
                totalProjectsCardContainer={<TotalProjectsCardContainer />}
                totalTasksCardContainer={<TotalTasksCardContainer />}
                totalUsersCardContainer={<TotalUsersCardContainer />}
                totalCustomersCardContainer={<TotalCustomersCardContainer />}
                assignedTasksContainer={
                  <AssignedTasksContainer
                    tasks={tasks}
                    totalCount={totalCount}
                    page={page}
                    pageSize={pageSize}
                  />
                }
                appHeaderProps={defaultAppHeaderSlots}
              />
            </DeleteTasksProvider>
          </CurrentUserProvider>
        </PageTransitionProvider>
      </SelectedTasksProvider>
    </UpdateTaskStatusesProvider>
  );
}
