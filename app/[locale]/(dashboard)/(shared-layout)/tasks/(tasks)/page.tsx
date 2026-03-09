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
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { createTask } from "@/lib/actions/task/createTask";
import { taskCategoryId } from "@/lib/schemas/taskCategory";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { TasksContainer } from "@/components/tasks/TasksContainer";
import { getTaskCount, getTaskList } from "@/lib/data/task/task.dal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { CreateTaskProvider } from "@/components/tasks/CreateTaskContext";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { DeleteTasksProvider } from "@/components/tasks/DeleteTasksContext";
import { CurrentUserProvider } from "@/components/common/CurrentUserContext";
import { NewTaskFormContainer } from "@/components/tasks/NewTaskFormContainer";
import { SelectedTasksProvider } from "@/components/tasks/SelectedTasksContext";
import { PageTransitionProvider } from "@/components/common/PageTransitionContext";
import { createTaskCategory } from "@/lib/actions/taskCategory/createTaskCategory";
import { TaskFiltersFormContainer } from "@/components/tasks/TaskFiltersFormContainer";
import { UpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusesContext";
import { CreateTaskCategoryProvider } from "@/components/taskCategory/CreateTaskCategoryContext";

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
  const session = await requireProtectedPage();

  // Validation
  const rawParams = await searchParams;
  const validated = searchParamsSchema.parse(rawParams);
  const { page, pageSize, sort, ...filters } = validated;

  // This data is required to determine the user's role
  // and render the UI accordingly on the client side.
  const currentUserContextValue = {
    isGuest: await hasGuestRole(),
    isOwner: await hasOwnerRole(),
    userId: session.user.id,
  };

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
    <CurrentUserProvider value={currentUserContextValue}>
      <UpdateTaskStatusesProvider updateTaskStatuses={updateTaskStatuses}>
        <SelectedTasksProvider
          pageItems={tasks.map((t) => ({ id: t.id, status: t.status }))}
        >
          <PageTransitionProvider>
            <DeleteTasksProvider deleteTasks={deleteTasks}>
              <CreateTaskCategoryProvider
                createTaskCategory={createTaskCategory}
              >
                <CreateTaskProvider createTask={createTask}>
                  <TasksPage
                    totalCount={totalCount}
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
                  />
                </CreateTaskProvider>
              </CreateTaskCategoryProvider>
            </DeleteTasksProvider>
          </PageTransitionProvider>
        </SelectedTasksProvider>
      </UpdateTaskStatusesProvider>
    </CurrentUserProvider>
  );
}
