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
import { taskCategoryId } from "@/lib/schemas/taskCategory";
import { TasksContainer } from "@/components/tasks/TasksContainer";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { CreateTaskModal } from "@/components/tasks/CreateTaskModal";
import { getTaskCount, getTaskList } from "@/lib/data/task/task.dal";
import { TaskFiltersModal } from "@/components/tasks/TaskFiltersModal";
import { DeleteTasksModal } from "@/components/tasks/DeleteTasksModal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { CreateTaskProvider } from "@/components/tasks/CreateTaskProvider";
import { TaskFiltersProvider } from "@/components/tasks/TaskFiltersContext";
import { DeleteTasksProvider } from "@/components/tasks/DeleteTasksProvider";
import { AssigneeFiltersModal } from "@/components/tasks/AssigneeFiltersModal";
import { SelectedTasksProvider } from "@/components/tasks/SelectedTasksContext";
import { TaskStatusFiltersModal } from "@/components/tasks/TaskStatusFiltersModal";
import { TaskProjectFiltersModal } from "@/components/tasks/TaskProjectFiltersModal";
import { CreateTaskFormContainer } from "@/components/tasks/CreateTaskFormContainer";
import { TaskCategoryFiltersModal } from "@/components/tasks/TaskCategoryFiltersModal";
import { TaskFiltersFormContainer } from "@/components/tasks/TaskFiltersFormContainer";
import { TaskRouterSearchContainer } from "@/components/tasks/TaskRouterSearchContainer";
import { UpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusesProvider";
import { CreateTaskCategoryModal } from "@/components/taskCategory/CreateTaskCategoryModal";
import { AssigneeFiltersFormContainer } from "@/components/tasks/AssigneeFiltersFormContainer";
import { CreateTaskCategoryProvider } from "@/components/taskCategory/CreateTaskCategoryProvider";
import { TaskProjectFiltersFormContainer } from "@/components/tasks/TaskProjectFiltersFormContainer";
import { TaskCategoryFiltersFormContainer } from "@/components/tasks/TaskCategoryFiltersFormContainer";

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
    <SelectedTasksProvider pageItems={tasks}>
      <UpdateTaskStatusesProvider>
        <DeleteTasksProvider>
          <CreateTaskProvider>
            <CreateTaskCategoryProvider>
              <TaskFiltersProvider filters={filters}>
                <TasksPage
                  totalCount={totalCount}
                  totalFilteredTasks={totalFilteredTasks}
                  selectedSortField={sort}
                  tasksContainer={
                    <TasksContainer
                      tasks={tasks}
                      totalCount={totalFilteredTasks}
                      page={page}
                      pageSize={pageSize}
                      showCheckbox={true}
                    />
                  }
                />

                <TaskSearchModal
                  searchContainer={<TaskRouterSearchContainer />}
                />
                <CreateTaskModal
                  createTaskFormContainer={<CreateTaskFormContainer />}
                />
                <CreateTaskCategoryModal />
                <DeleteTasksModal />

                <TaskFiltersModal
                  filtersFormContainer={<TaskFiltersFormContainer />}
                />
                <TaskStatusFiltersModal />
                <TaskCategoryFiltersModal
                  filtersFormContainer={<TaskCategoryFiltersFormContainer />}
                />
                <TaskProjectFiltersModal
                  filtersFormContainer={<TaskProjectFiltersFormContainer />}
                />
                <AssigneeFiltersModal
                  filtersFormContainer={<AssigneeFiltersFormContainer />}
                />
              </TaskFiltersProvider>
            </CreateTaskCategoryProvider>
          </CreateTaskProvider>
        </DeleteTasksProvider>
      </UpdateTaskStatusesProvider>
    </SelectedTasksProvider>
  );
}
