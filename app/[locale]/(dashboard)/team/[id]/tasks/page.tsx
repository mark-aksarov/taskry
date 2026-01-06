import {
  GlobalContainerProvider,
  GlobalContainerContextType,
} from "@/components/layout/GlobalContainerContext";

import { z } from "zod";
import { Suspense } from "react";
import { getTaskCount } from "@/lib/data/task/task.dal";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { TaskFormBaseSkeleton } from "@/components/tasks/TaskFormBase";
import { canCreateTask, canDeleteTask } from "@/lib/data/user/user.dal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { TeamProfileTasksPageEmpty } from "./TeamProfileTasksPageEmpty";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { UserTasksContainer } from "@/components/users/UserTasksContainer";
import { UserTasksPageLayout } from "@/components/users/UserTasksPageLayout";
import { UserHeaderContainer } from "@/components/users/UserHeaderContainer";
import { NewTaskFormContainer } from "@/components/tasks/NewTaskFormContainer";
import { UserNavigationMobile } from "@/components/users/UserNavigationMobile";
import { TaskCommentsContainer } from "@/components/tasks/TaskCommentsContainer";
import { EditTaskFormContainer } from "@/components/tasks/EditTaskFormContainer";
import { UserNavigationDesktop } from "@/components/users/UserNavigationDesktop";
import { TaskDetailCompactContainer } from "@/components/tasks/TaskDetailCompactContainer";

const searchParamsSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  pageSize: z.coerce.number().int().min(1).max(100).catch(20),
  sort: z.enum(["title", "deadline", "status", "category"]).catch("title"),
});

const context: GlobalContainerContextType = {
  EditTaskFormContainer,
  TaskDetailCompactContainer,
  TaskCommentsContainer,
};

export default async function AppProfileTasksPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string; pageSize?: string; sort?: string }>;
}) {
  // Authorization
  await requireProtectedPage();

  const { id } = await params;

  // Validation
  const rawParams = await searchParams;
  const { page, pageSize, sort } = searchParamsSchema.parse(rawParams);

  // Get count
  const taskCount = await getTaskCount();

  if (!taskCount)
    return (
      <TeamProfileTasksPageEmpty
        userId={id}
        newTaskFormContainer={
          <Suspense fallback={<TaskFormBaseSkeleton />}>
            <NewTaskFormContainer />
          </Suspense>
        }
        userHeaderContainer={<UserHeaderContainer userId={id} />}
      />
    );

  const canCreate = await canCreateTask();
  const canDelete = await canDeleteTask();

  return (
    <GlobalContainerProvider value={context}>
      <UserTasksPageLayout
        canCreateTask={canCreate}
        canDeleteTask={canDelete}
        userTasksContainer={
          <UserTasksContainer
            userId={id}
            page={page}
            pageSize={pageSize}
            sort={sort}
            baseUrl={`/team/${id}/tasks`}
          />
        }
        userHeaderContainer={<UserHeaderContainer userId={id} />}
        newTaskFormContainer={
          <Suspense fallback={<TaskFormBaseSkeleton />}>
            <NewTaskFormContainer />
          </Suspense>
        }
        deleteTasksAction={deleteTasks}
        updateTasksStatusesAction={updateTaskStatuses}
        navigationDesktop={<UserNavigationDesktop />}
        navigationMobile={<UserNavigationMobile />}
      />
    </GlobalContainerProvider>
  );
}
