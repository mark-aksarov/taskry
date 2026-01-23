import { z } from "zod";
import { Suspense } from "react";
import { TasksPage } from "./TasksPage";
import { TasksPageEmpty } from "./TasksPageEmpty";
import { arrayParam } from "@/lib/utils/arrayParam";
import { TaskStatus } from "@/generated/prisma/enums";
import { getTaskCount } from "@/lib/data/task/task.dal";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { TasksContainer } from "@/components/tasks/TasksContainer";
import { TaskFormBaseSkeleton } from "@/components/tasks/TaskFormBase";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { TaskFiltersFormSkeleton } from "@/components/tasks/TaskFiltersForm";
import { NewTaskFormContainer } from "@/components/tasks/NewTaskFormContainer";
import { TaskCategoryFormBase } from "@/components/tasks/TaskCategoryFormBase";
import { createTaskCategory } from "@/lib/actions/taskCategory/createTaskCategory";
import { TaskFiltersFormContainer } from "@/components/tasks/TaskFiltersFormContainer";
import { TaskToolbarActionsMenuTrigger } from "@/components/tasks/TaskToolbarActionsMenuTrigger";
import { TaskToolbarFiltersModalTrigger } from "@/components/tasks/TaskToolbarFiltersModalTrigger";
import { TaskToolbarCreateNewMenuTrigger } from "@/components/tasks/TaskToolbarCreateNewMenuTrigger";

const searchParamsSchema = z.object({
  onlyMyTasks: z
    .preprocess((val) => val === "true", z.boolean())
    .optional()
    .catch(undefined),
  page: z.coerce.number().int().positive().catch(1),
  pageSize: z.coerce.number().int().min(1).max(100).catch(20),
  sort: z.enum(["title", "deadline", "status", "category"]).catch("title"),
  status: arrayParam(z.enum(TaskStatus)).catch([]),
  category: arrayParam(z.coerce.number()).catch([]),
  project: arrayParam(z.coerce.number()).catch([]),
  assignee: arrayParam(z.string()).catch([]),
  deadline: z
    .enum(["today", "tomorrow", "thisWeek", "overdue"])
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

  if (!taskCount) {
    return (
      <TasksPageEmpty
        newTaskFormContainer={
          <Suspense fallback={<TaskFormBaseSkeleton />}>
            <NewTaskFormContainer />
          </Suspense>
        }
      />
    );
  }

  return (
    <TasksPage
      taskToolbarActionsMenuTrigger={
        <TaskToolbarActionsMenuTrigger
          deleteAction={deleteTasks}
          updateStatusAction={updateTaskStatuses}
        />
      }
      taskToolbarCreateNewMenuTrigger={
        <TaskToolbarCreateNewMenuTrigger
          newTaskFormContainer={
            <Suspense fallback={<TaskFormBaseSkeleton />}>
              <NewTaskFormContainer />
            </Suspense>
          }
          newTaskCategoryForm={
            <TaskCategoryFormBase formAction={createTaskCategory} />
          }
        />
      }
      taskToolbarFiltersModalTrigger={
        <TaskToolbarFiltersModalTrigger
          filtersFormContainer={
            <Suspense fallback={<TaskFiltersFormSkeleton />}>
              <TaskFiltersFormContainer filters={filters} />
            </Suspense>
          }
        />
      }
      tasksContainer={
        <TasksContainer
          page={page}
          pageSize={pageSize}
          sort={sort}
          filters={filters}
        />
      }
    />
  );
}
