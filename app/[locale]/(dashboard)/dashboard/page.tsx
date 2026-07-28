import { z } from "zod";
import { DashboardPage } from "./DashboardPage";
import { getTaskList } from "@/lib/data/task/task.dal";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { TaskGridContainer } from "@/dashboard/tasks/TaskGridContainer";
import { pageSearchParam, pageSizeSearchParam } from "@/lib/schemas/base";
import { LinkSearchContainer } from "@/dashboard/common/LinkSearchContainer";
import { CreateTaskFormContainer } from "@/dashboard/tasks/CreateTaskFormContainer";
import { TotalTasksCardContainer } from "@/dashboard/tasks/TotalTasksCardContainer";
import { TotalUsersCardContainer } from "@/dashboard/users/TotalUsersCardContainer";
import { TotalClientsCardContainer } from "@/dashboard/client/TotalClientsCardContainer";
import { TotalProjectsCardContainer } from "@/dashboard/projects/TotalProjectsCardContainer";

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
  const session = await requireFullAccess();

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
    <DashboardPage
      taskPage={page}
      taskPageSize={pageSize}
      totalTaskCount={totalCount}
      selectedItems={tasks.map((t) => ({ id: t.id, status: t.status }))}
      totalProjectsCardContainer={<TotalProjectsCardContainer />}
      totalTasksCardContainer={<TotalTasksCardContainer />}
      totalUsersCardContainer={<TotalUsersCardContainer />}
      totalClientsCardContainer={<TotalClientsCardContainer />}
      taskGrid={<TaskGridContainer tasks={tasks} showCheckbox={false} />}
      searchContainer={<LinkSearchContainer pathname="/tasks" />}
      createTaskFormContainer={
        <CreateTaskFormContainer forcedAssigneeId={session!.user.id} />
      }
    />
  );
}
