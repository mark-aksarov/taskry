import {
  pageSearchParam,
  dateSearchParam,
  booleanSearchParam,
  pageSizeSearchParam,
  searchParamToArray,
  searchQueryParam,
} from "@/lib/schemas/base";

import { z } from "zod";
import { TasksPage } from "./TasksPage";
import { userId } from "@/lib/schemas/user";
import { taskSortFields } from "@/lib/types";
import { taskStatus } from "@/lib/schemas/task";
import { projectId } from "@/lib/schemas/project";
import { createTask } from "@/lib/actions/task/createTask";
import { taskCategoryId } from "@/lib/schemas/taskCategory";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { TasksContainer } from "@/components/tasks/TasksContainer";
import { getTaskCount, getTaskList } from "@/lib/data/task/task.dal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { CreateTaskProvider } from "@/components/tasks/CreateTaskContext";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { DeleteTasksProvider } from "@/components/tasks/DeleteTasksContext";
import { TaskFiltersProvider } from "@/components/tasks/TaskFiltersContext";
import { CreateTaskFormContainer } from "@/components/tasks/CreateTaskFormContainer";
import { SelectedTasksProvider } from "@/components/tasks/SelectedTasksContext";
import { TaskFiltersFormContainer } from "@/components/tasks/TaskFiltersFormContainer";
import { TaskRouterSearchContainer } from "@/components/tasks/TaskRouterSearchContainer";
import { UpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusesContext";
import { CreateTaskCategoryProvider } from "@/components/taskCategory/CreateTaskCategoryProvider";
import { TaskCategoryFiltersFormContainer } from "@/components/tasks/TaskCategoryFiltersFormContainer";
import { TaskProjectFiltersFormContainer } from "@/components/tasks/TaskProjectFiltersFormContainer";
import { AssigneeFiltersFormContainer } from "@/components/tasks/AssigneeFiltersFormContainer";

const searchParamsSchema = z.object({
  query: searchQueryParam,
  page: pageSearchParam,
  pageSize: pageSizeSearchParam,
  deadlineFrom: dateSearchParam,
  deadlineTo: dateSearchParam,
  onlyMyTasks: booleanSearchParam,
  sort: z.enum(taskSortFields).catch("createdAt"),
  statuses: z.preprocess(
    searchParamToArray,
    z.array(taskStatus).optional().catch(undefined),
  ),
  categoryIds: z.preprocess(
    searchParamToArray,
    z.array(taskCategoryId).optional().catch(undefined),
  ),
  projectIds: z.preprocess(
    searchParamToArray,
    z.array(projectId).optional().catch(undefined),
  ),
  assigneeIds: z.preprocess(
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

  // Validation
  const rawParams = await searchParams;
  const validated = searchParamsSchema.parse(rawParams);
  const { page, pageSize, sort, ...filters } = validated;

  // Render the empty page if there are no tasks (without applying filters)
  const totalCount = await getTaskCount();

  // Get tasks for the current page based on filters and sorting
  const { items: tasks, totalCount: totalFilteredTasks } = await getTaskList({
    page,
    pageSize,
    sort,
    filters,
  });

  return (
    <UpdateTaskStatusesProvider updateTaskStatuses={updateTaskStatuses}>
      <SelectedTasksProvider
        pageItems={tasks.map((t) => ({ id: t.id, status: t.status }))}
      >
        <DeleteTasksProvider deleteTasks={deleteTasks}>
          <CreateTaskCategoryProvider>
            <CreateTaskProvider createTask={createTask}>
              <TaskFiltersProvider filters={filters}>
                <TasksPage
                  totalCount={totalCount}
                  totalFilteredTasks={totalFilteredTasks}
                  selectedSortField={sort}
                  createTaskFormContainer={<CreateTaskFormContainer />}
                  filtersFormContainer={<TaskFiltersFormContainer />}
                  taskCategoryFiltersFormContainer={
                    <TaskCategoryFiltersFormContainer />
                  }
                  projectFiltersFormContainer={
                    <TaskProjectFiltersFormContainer />
                  }
                  assigneeFiltersFormContainer={
                    <AssigneeFiltersFormContainer />
                  }
                  searchContainer={<TaskRouterSearchContainer />}
                  tasksContainer={
                    <TasksContainer
                      tasks={tasks}
                      totalCount={totalFilteredTasks}
                      page={page}
                      pageSize={pageSize}
                    />
                  }
                />
              </TaskFiltersProvider>
            </CreateTaskProvider>
          </CreateTaskCategoryProvider>
        </DeleteTasksProvider>
      </SelectedTasksProvider>
    </UpdateTaskStatusesProvider>
  );
}
