import {
  pageSearchParam,
  dateSearchParam,
  arraySearchParam,
  booleanSearchParam,
  pageSizeSearchParam,
  coercedPositiveInt,
} from "@/lib/schemas/base";

import { z } from "zod";
import { TasksPage } from "./TasksPage";
import { TasksPageEmpty } from "./TasksPageEmpty";
import { TaskStatus } from "@/generated/prisma/enums";
import { getTaskCount } from "@/lib/data/task/task.dal";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { TasksContainer } from "@/components/tasks/TasksContainer";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { NewTaskFormContainer } from "@/components/tasks/NewTaskFormContainer";
import { createTaskCategory } from "@/lib/actions/taskCategory/createTaskCategory";
import { NewTaskCategoryForm } from "@/components/taskCategory/NewTaskCategoryForm";
import { TaskFiltersFormContainer } from "@/components/tasks/TaskFiltersFormContainer";
import { TaskToolbarActionsMenuTrigger } from "@/components/tasks/TaskToolbarActionsMenuTrigger";
import { TaskToolbarFiltersModalTrigger } from "@/components/tasks/TaskToolbarFiltersModalTrigger";
import { TaskToolbarCreateNewMenuTrigger } from "@/components/tasks/TaskToolbarCreateNewMenuTrigger";

const searchParamsSchema = z.object({
  page: pageSearchParam,
  pageSize: pageSizeSearchParam,
  deadlineFrom: dateSearchParam,
  deadlineTo: dateSearchParam,
  onlyMyTasks: booleanSearchParam,
  sort: z.enum(["title", "deadline", "status", "category"]).catch("title"),
  status: arraySearchParam(z.enum(TaskStatus)),
  category: arraySearchParam(coercedPositiveInt),
  project: arraySearchParam(coercedPositiveInt),
  assignee: arraySearchParam(z.string()),
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
  const guestMode = await hasGuestRole();

  if (!taskCount) {
    return <TasksPageEmpty newTaskFormContainer={<NewTaskFormContainer />} />;
  }

  return (
    <TasksPage
      taskToolbarActionsMenuTrigger={
        <TaskToolbarActionsMenuTrigger
          guestMode={guestMode}
          deleteAction={deleteTasks}
          updateStatusAction={updateTaskStatuses}
        />
      }
      taskToolbarCreateNewMenuTrigger={
        <TaskToolbarCreateNewMenuTrigger
          guestMode={guestMode}
          newTaskFormContainer={<NewTaskFormContainer />}
          newTaskCategoryForm={
            <NewTaskCategoryForm createTaskCategory={createTaskCategory} />
          }
        />
      }
      taskToolbarFiltersModalTrigger={
        <TaskToolbarFiltersModalTrigger
          filtersFormContainer={<TaskFiltersFormContainer filters={filters} />}
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
