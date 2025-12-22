import { z } from "zod";
import { TasksPage } from "./TasksPage";
import { getTaskCount } from "@/lib/dal/task";
import { TasksPageEmpty } from "./TasksPageEmpty";
import { arrayParam } from "@/lib/utils/arrayParam";
import { TaskStatus } from "@/generated/prisma/enums";
import { deleteTasks } from "@/lib/actions/deleteTasks";
import { updateTaskStatuses } from "@/lib/actions/updateTaskStatuses";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { TasksServerContainer } from "@/components/tasks/TasksServerContainer";
import { NewTaskFormServerContainer } from "@/components/tasks/NewTaskFormServerContainer";
import { EditTaskFormClientContainer } from "@/components/tasks/EditTaskFormClientContainer";
import { TaskFiltersFormServerContainer } from "@/components/tasks/TaskFiltersFormServerContainer";
import { EditTaskFormClientContainerProvider } from "@/components/tasks/EditTaskFormClientContainerContext";

const searchParamsSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  pageSize: z.coerce.number().int().min(1).max(100).catch(20),
  sort: z.enum(["title", "deadline", "status", "category"]).catch("title"),
  status: arrayParam(z.enum(TaskStatus)).catch([]),
  category: arrayParam(z.coerce.number()).catch([]),
  project: arrayParam(z.coerce.number()).catch([]),
  assignee: arrayParam(z.string()).catch([]),
  deadline: z
    .enum(["today", "tomorrow", "overdue"])
    .optional()
    .catch(undefined),
  dateStart: z.string().optional().catch(undefined),
  dateEnd: z.string().optional().catch(undefined),
});

export default async function AppTasksPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  await requireProtectedPage();

  const rawParams = await searchParams;
  const validated = searchParamsSchema.parse(rawParams);
  const { page, pageSize, sort, ...filters } = validated;

  const taskCount = await getTaskCount();

  if (!taskCount) return <TasksPageEmpty />;

  return (
    <EditTaskFormClientContainerProvider value={EditTaskFormClientContainer}>
      <TasksPage
        page={page}
        pageSize={pageSize}
        sort={sort}
        filters={filters}
        TaskFiltersFormContainer={TaskFiltersFormServerContainer}
        NewTaskFormContainer={NewTaskFormServerContainer}
        TasksServerContainer={TasksServerContainer}
        deleteTasksAction={deleteTasks}
        updateTasksStatusesAction={updateTaskStatuses}
      />
    </EditTaskFormClientContainerProvider>
  );
}
