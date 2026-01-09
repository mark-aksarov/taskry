import {
  GlobalContainerProvider,
  GlobalContainerContextType,
} from "@/components/layout/GlobalContainerContext";

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
import { canCreateTask, canDeleteTask } from "@/lib/data/user/user.dal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { TaskFiltersFormSkeleton } from "@/components/tasks/TaskFiltersForm";
import { UserDetailContainer } from "@/components/users/UserDetailContainer";
import { NewTaskFormContainer } from "@/components/tasks/NewTaskFormContainer";
import { TaskCommentsContainer } from "@/components/tasks/TaskCommentsContainer";
import { EditTaskFormContainer } from "@/components/tasks/EditTaskFormContainer";
import { createTaskCategory } from "@/lib/actions/taskCategory/createTaskCategory";
import { TaskFiltersFormContainer } from "@/components/tasks/TaskFiltersFormContainer";
import { TaskDetailCompactContainer } from "@/components/tasks/TaskDetailCompactContainer";
import { ProjectDetailCompactContainer } from "@/components/projects/ProjectDetailCompactContainer";

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

const context: GlobalContainerContextType = {
  EditTaskFormContainer,
  TaskDetailCompactContainer,
  TaskCommentsContainer,
  ProjectDetailCompactContainer,
  UserDetailContainer,
};

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

  const canCreate = await canCreateTask();
  const canDelete = await canDeleteTask();

  return (
    <GlobalContainerProvider value={context}>
      <TasksPage
        canCreateTask={canCreate}
        canDeleteTask={canDelete}
        taskFiltersFormContainer={
          <Suspense fallback={<TaskFiltersFormSkeleton />}>
            <TaskFiltersFormContainer filters={filters} />
          </Suspense>
        }
        newTaskFormContainer={
          <Suspense fallback={<TaskFormBaseSkeleton />}>
            <NewTaskFormContainer />
          </Suspense>
        }
        tasksContainer={
          <TasksContainer
            page={page}
            pageSize={pageSize}
            sort={sort}
            filters={filters}
          />
        }
        deleteTasksAction={deleteTasks}
        updateTasksStatusesAction={updateTaskStatuses}
        createTaskCategoryAction={createTaskCategory}
      />
    </GlobalContainerProvider>
  );
}
