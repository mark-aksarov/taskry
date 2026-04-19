import { z } from "zod";
import { DashboardPage } from "./DashboardPage";
import { getTaskList } from "@/lib/data/task/task.dal";
import { TasksContainer } from "@/components/tasks/TasksContainer";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { CreateTaskModal } from "@/components/tasks/CreateTaskModal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { pageSearchParam, pageSizeSearchParam } from "@/lib/schemas/base";
import { CreateTaskProvider } from "@/components/tasks/CreateTaskProvider";
import { DeleteTasksProvider } from "@/components/tasks/DeleteTasksProvider";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { SelectedTasksProvider } from "@/components/tasks/SelectedTasksContext";
import { CreateTaskFormContainer } from "@/components/tasks/CreateTaskFormContainer";
import { TotalTasksCardContainer } from "@/components/tasks/TotalTasksCardContainer";
import { TotalUsersCardContainer } from "@/components/users/TotalUsersCardContainer";
import { UpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusesProvider";
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
              totalTaskCount={totalCount}
              totalProjectsCardContainer={<TotalProjectsCardContainer />}
              totalTasksCardContainer={<TotalTasksCardContainer />}
              totalUsersCardContainer={<TotalUsersCardContainer />}
              totalCustomersCardContainer={<TotalCustomersCardContainer />}
              tasksContainer={
                <TasksContainer
                  tasks={tasks}
                  totalCount={totalCount}
                  page={page}
                  pageSize={pageSize}
                  showCheckbox={false}
                />
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
