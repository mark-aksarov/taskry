import {
  pageSearchParam,
  dateSearchParam,
  booleanSearchParam,
  pageSizeSearchParam,
  searchParamToArray,
} from "@/lib/schemas/base";

import { z } from "zod";
import { TasksPage } from "./TasksPage";
import { userId } from "@/lib/schemas/user";
import { taskStatus } from "@/lib/schemas/task";
import { projectId } from "@/lib/schemas/project";
import { TasksPageEmpty } from "./TasksPageEmpty";
import { getTaskList } from "@/lib/data/task/task.dal";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { taskCategoryId } from "@/lib/schemas/taskCategory";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { TasksContainer } from "@/components/tasks/TasksContainer";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { NewTaskFormContainer } from "@/components/tasks/NewTaskFormContainer";
import { createTaskCategory } from "@/lib/actions/taskCategory/createTaskCategory";
import { NewTaskCategoryForm } from "@/components/taskCategory/NewTaskCategoryForm";
import { TaskFiltersFormContainer } from "@/components/tasks/TaskFiltersFormContainer";
import { UpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusContext";
import { TaskToolbarActionsMenuTrigger } from "@/components/tasks/TaskToolbarActionsMenuTrigger";
import { TaskToolbarFiltersModalTrigger } from "@/components/tasks/TaskToolbarFiltersModalTrigger";
import { TaskToolbarCreateNewMenuTrigger } from "@/components/tasks/TaskToolbarCreateNewMenuTrigger";
import { SelectedTasksProvider } from "@/components/tasks/SelectedTasksContext/SelectedTasksContext";

const searchParamsSchema = z.object({
  page: pageSearchParam,
  pageSize: pageSizeSearchParam,
  deadlineFrom: dateSearchParam,
  deadlineTo: dateSearchParam,
  onlyMyTasks: booleanSearchParam,
  sort: z.enum(["title", "deadline", "status", "category"]).catch("title"),
  status: z.preprocess(
    searchParamToArray,
    z.array(taskStatus).optional().catch(undefined),
  ),
  category: z.preprocess(
    searchParamToArray,
    z.array(taskCategoryId).optional().catch(undefined),
  ),
  project: z.preprocess(
    searchParamToArray,
    z.array(projectId).optional().catch(undefined),
  ),
  assignee: z.preprocess(
    searchParamToArray,
    z.array(userId).optional().catch(undefined),
  ),
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

  const { items: tasks, totalCount } = await getTaskList({
    page,
    pageSize,
    sort,
    filters,
  });
  const guestMode = await hasGuestRole();

  const taskToolbarCreateNewMenuTrigger = (
    <TaskToolbarCreateNewMenuTrigger
      guestMode={guestMode}
      newTaskFormContainer={<NewTaskFormContainer />}
      newTaskCategoryForm={
        <NewTaskCategoryForm createTaskCategory={createTaskCategory} />
      }
    />
  );

  if (!totalCount) {
    return (
      <TasksPageEmpty
        taskToolbarCreateNewMenuTrigger={taskToolbarCreateNewMenuTrigger}
      />
    );
  }

  return (
    <UpdateTaskStatusesProvider updateStatus={updateTaskStatuses}>
      <SelectedTasksProvider
        pageItems={tasks.map((t) => ({ id: t.id, status: t.status }))}
      >
        <TasksPage
          taskToolbarActionsMenuTrigger={
            <TaskToolbarActionsMenuTrigger
              guestMode={guestMode}
              deleteTasks={deleteTasks}
            />
          }
          taskToolbarCreateNewMenuTrigger={taskToolbarCreateNewMenuTrigger}
          taskToolbarFiltersModalTrigger={
            <TaskToolbarFiltersModalTrigger
              filtersFormContainer={
                <TaskFiltersFormContainer filters={filters} />
              }
            />
          }
          tasksContainer={
            <TasksContainer
              tasks={tasks}
              totalCount={totalCount}
              page={page}
              pageSize={pageSize}
            />
          }
        />
      </SelectedTasksProvider>
    </UpdateTaskStatusesProvider>
  );
}
