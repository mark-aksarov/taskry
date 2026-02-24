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
import { taskSortFields } from "@/lib/types";
import { taskStatus } from "@/lib/schemas/task";
import { projectId } from "@/lib/schemas/project";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { taskCategoryId } from "@/lib/schemas/taskCategory";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { TasksContainer } from "@/components/tasks/TasksContainer";
import { TasksPageEmptyContainer } from "./TasksPageEmptyContainer";
import { getTaskCount, getTaskList } from "@/lib/data/task/task.dal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { NewTaskFormContainer } from "@/components/tasks/NewTaskFormContainer";
import { SelectedTasksProvider } from "@/components/tasks/SelectedTasksContext";
import { PageTransitionProvider } from "@/components/common/PageTransitionContext";
import { createTaskCategory } from "@/lib/actions/taskCategory/createTaskCategory";
import { TaskFiltersFormContainer } from "@/components/tasks/TaskFiltersFormContainer";
import { UpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusContext";

const searchParamsSchema = z.object({
  page: pageSearchParam,
  pageSize: pageSizeSearchParam,
  deadlineFrom: dateSearchParam,
  deadlineTo: dateSearchParam,
  onlyMyTasks: booleanSearchParam,
  sort: z.enum(taskSortFields).catch("createdAt"),
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

  // Get total count of tasks in the current workspace
  const totalCount = await getTaskCount();
  const guestMode = await hasGuestRole();

  if (!totalCount) {
    return (
      <TasksPageEmptyContainer
        guestMode={guestMode}
        newTaskFormContainer={<NewTaskFormContainer />}
        createTaskCategory={createTaskCategory}
      />
    );
  }

  // Get tasks for the current page based on filters and sorting
  const { items: tasks, totalCount: totalFilteredTasks } = await getTaskList({
    page,
    pageSize,
    sort,
    filters,
  });

  return (
    <UpdateTaskStatusesProvider updateStatus={updateTaskStatuses}>
      <SelectedTasksProvider
        pageItems={tasks.map((t) => ({ id: t.id, status: t.status }))}
      >
        <PageTransitionProvider>
          <TasksPage
            guestMode={guestMode}
            totalFilteredTasks={totalFilteredTasks}
            selectedSortField={sort}
            newTaskFormContainer={<NewTaskFormContainer />}
            filtersFormContainer={
              <TaskFiltersFormContainer filters={filters} />
            }
            tasksContainer={
              <TasksContainer
                tasks={tasks}
                totalCount={totalFilteredTasks}
                page={page}
                pageSize={pageSize}
              />
            }
            createTaskCategory={createTaskCategory}
            deleteTasks={deleteTasks}
          />
        </PageTransitionProvider>
      </SelectedTasksProvider>
    </UpdateTaskStatusesProvider>
  );
}
