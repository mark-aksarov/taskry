import { z } from "zod";
import { DashboardPage } from "./DashboardPage";
import { getTaskList } from "@/lib/data/task/task.dal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { pageSearchParam, pageSizeSearchParam } from "@/lib/schemas/base";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { SelectedTasksProvider } from "@/components/tasks/SelectedTasksContext";
import { AssignedTasksContainer } from "@/components/tasks/AssignedTasksContainer";
import { TotalTasksCardContainer } from "@/components/tasks/TotalTasksCardContainer";
import { TotalUsersCardContainer } from "@/components/users/TotalUsersCardContainer";
import { UpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusContext";
import { TotalProjectsCardContainer } from "@/components/projects/TotalProjectsCardContainer";
import { TotalCustomersCardContainer } from "@/components/customer/TotalCustomersCardContainer";
import { SearchModal } from "@/components/search/SearchModal";
import { TasksSearchContainer } from "@/components/search/TasksSearchContainer";
import { ProjectsSearchContainer } from "@/components/search/ProjectsSearchContainer";

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

  const assigneeId = session!.user.id;

  const filters = {
    assignee: [assigneeId],
  };

  const { items: tasks, totalCount } = await getTaskList({
    page,
    pageSize,
    sort: "deadline",
    filters,
  });

  return (
    <UpdateTaskStatusesProvider updateStatus={updateTaskStatuses}>
      <SelectedTasksProvider
        pageItems={tasks.map((task) => ({ id: task.id, status: task.status }))}
      >
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
          searchModal={
            <SearchModal
              tasksSearchContainer={<TasksSearchContainer />}
              projectsSearchContainer={<ProjectsSearchContainer />}
            />
          }
        />
      </SelectedTasksProvider>
    </UpdateTaskStatusesProvider>
  );
}
