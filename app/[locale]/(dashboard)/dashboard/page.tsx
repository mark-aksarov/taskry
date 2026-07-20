import { z } from "zod";
import { DashboardPage } from "./DashboardPage";
import { getTaskList } from "@/lib/data/task/task.dal";
import { TaskSearchModal } from "@/dashboard/tasks/TaskSearchModal";
import { CreateTaskModal } from "@/dashboard/tasks/CreateTaskModal";
import { TaskGridContainer } from "@/dashboard/tasks/TaskGridContainer";
import { requireProtectedPageSession } from "@/lib/utils/requireProtectedPageSession";
import { pageSearchParam, pageSizeSearchParam } from "@/lib/schemas/base";
import { CreateTaskProvider } from "@/dashboard/tasks/CreateTaskProvider";
import { DeleteTasksProvider } from "@/dashboard/tasks/DeleteTasksProvider";
import { LinkSearchContainer } from "@/dashboard/common/LinkSearchContainer";
import { SelectedTasksProvider } from "@/dashboard/tasks/SelectedTasksContext";
import { CreateTaskFormContainer } from "@/dashboard/tasks/CreateTaskFormContainer";
import { TotalTasksCardContainer } from "@/dashboard/tasks/TotalTasksCardContainer";
import { TotalUsersCardContainer } from "@/dashboard/users/TotalUsersCardContainer";
import { UpdateTaskStatusesProvider } from "@/dashboard/tasks/UpdateTaskStatusesProvider";
import { TotalProjectsCardContainer } from "@/dashboard/projects/TotalProjectsCardContainer";
import { TotalCustomersCardContainer } from "@/dashboard/customer/TotalCustomersCardContainer";

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
  const session = await requireProtectedPageSession();

  // Validation
  const rawParams = await searchParams;
  const { page, pageSize } = searchParamsSchema.parse(rawParams);

  // Get tasks for the current user
  const { items: tasks, totalCount } = await getTaskList({
    page,
    pageSize,
    sort: "createdAt",
    filters: {
      assigneeIds: [session.user.id],
    },
  });

  return (
    <DeleteTasksProvider>
      <CreateTaskProvider>
        <UpdateTaskStatusesProvider>
          <SelectedTasksProvider
            pageItems={tasks.map((t) => ({ id: t.id, status: t.status }))}
          >
            <DashboardPage
              taskPage={page}
              taskPageSize={pageSize}
              totalTaskCount={totalCount}
              totalProjectsCardContainer={<TotalProjectsCardContainer />}
              totalTasksCardContainer={<TotalTasksCardContainer />}
              totalUsersCardContainer={<TotalUsersCardContainer />}
              totalCustomersCardContainer={<TotalCustomersCardContainer />}
              taskGrid={
                <TaskGridContainer tasks={tasks} showCheckbox={false} />
              }
            />

            <CreateTaskModal
              createTaskFormContainer={
                <CreateTaskFormContainer forcedAssigneeId={session!.user.id} />
              }
            />
            <TaskSearchModal
              searchContainer={<LinkSearchContainer pathname="/tasks" />}
            />
          </SelectedTasksProvider>
        </UpdateTaskStatusesProvider>
      </CreateTaskProvider>
    </DeleteTasksProvider>
  );
}
