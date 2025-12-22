import { z } from "zod";
import { TasksPage } from "./TasksPage";
import { getTaskCount } from "@/lib/dal/task";
import { TasksPageEmpty } from "./TasksPageEmpty";
import { deleteTasks } from "@/lib/actions/deleteTasks";
import { updateTaskStatuses } from "@/lib/actions/updateTaskStatuses";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { TasksServerContainer } from "@/components/tasks/TasksServerContainer";
import { NewTaskFormServerContainer } from "@/components/tasks/NewTaskFormServerContainer";
import { TaskFiltersFormServerContainer } from "@/components/tasks/TaskFiltersFormServerContainer";

const searchParamsSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  pageSize: z.coerce.number().int().min(1).max(100).catch(20),
  sort: z.enum(["title", "deadline", "status", "category"]).catch("title"),
});

export default async function AppTasksPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string; sort?: string }>;
}) {
  // Authorization
  await requireProtectedPage();

  // Validation
  const rawParams = await searchParams;
  const { page, pageSize, sort } = searchParamsSchema.parse(rawParams);

  // Get count
  const taskCount = await getTaskCount();

  if (!taskCount) return <TasksPageEmpty />;

  return (
    <TasksPage
      page={page}
      pageSize={pageSize}
      sort={sort}
      TaskFiltersFormContainer={TaskFiltersFormServerContainer}
      NewTaskFormContainer={NewTaskFormServerContainer}
      TasksServerContainer={TasksServerContainer}
      deleteTasksAction={deleteTasks}
      updateTasksStatusesAction={updateTaskStatuses}
    />
  );
}
