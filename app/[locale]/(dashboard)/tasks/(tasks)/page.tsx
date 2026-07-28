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
import { getProjectCount } from "@/lib/data/project/project.dal";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { getTaskCount, getTaskList } from "@/lib/data/task/task.dal";
import { TaskGridContainer } from "@/dashboard/tasks/TaskGridContainer";
import { getTaskCategoryCount } from "@/lib/data/taskCategory/taskCategory.dal";
import { CreateTaskFormContainer } from "@/dashboard/tasks/CreateTaskFormContainer";
import { TaskFiltersFormContainer } from "@/dashboard/tasks/TaskFiltersFormContainer";
import { TaskRouterSearchContainer } from "@/dashboard/tasks/TaskRouterSearchContainer";
import { AssigneeFiltersFormContainer } from "@/dashboard/tasks/AssigneeFiltersFormContainer";
import { TaskProjectFiltersFormContainer } from "@/dashboard/tasks/TaskProjectFiltersFormContainer";
import { TaskCategoryFiltersFormContainer } from "@/dashboard/tasks/TaskCategoryFiltersFormContainer";

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
  await requireFullAccess();

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

  // Show category filters only when categories exist
  const categoryCount = await getTaskCategoryCount();

  // Show project filters only when projects exist
  const projectCount = await getProjectCount();

  return (
    <TasksPage
      page={page}
      pageSize={pageSize}
      totalCount={totalCount}
      categoryCount={categoryCount}
      projectCount={projectCount}
      totalFilteredTasks={totalFilteredTasks}
      selectedSortField={sort}
      selectedItems={tasks.map((task) => ({
        id: task.id,
        status: task.status,
      }))}
      filters={filters}
      taskGrid={<TaskGridContainer tasks={tasks} showCheckbox={true} />}
      searchContainer={<TaskRouterSearchContainer />}
      createTaskFormContainer={<CreateTaskFormContainer />}
      taskFiltersFormContainer={<TaskFiltersFormContainer />}
      assigneeFiltersFormContainer={<AssigneeFiltersFormContainer />}
      taskProjectFiltersFormContainer={<TaskProjectFiltersFormContainer />}
      taskCategoryFiltersFormContainer={<TaskCategoryFiltersFormContainer />}
    />
  );
}
