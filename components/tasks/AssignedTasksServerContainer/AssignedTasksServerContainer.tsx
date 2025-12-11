import {
  AssignedTasksSection,
  AssignedTasksEmptyCard,
  AssignedTasksSectionHeading,
} from "../AssignedTasks";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { TaskList } from "../TaskList";
import { TaskListItem } from "../TaskListItem";
import { Pagination } from "@/components/common/Pagination";
import { getTaskCount, getTaskList } from "@/lib/queries/task";
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";

interface AssignedTasksServerContainerProps {
  page: number;
  pageSize: number;
}

export async function AssignedTasksServerContainer({
  page,
  pageSize,
}: AssignedTasksServerContainerProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const workspaceId = await getUserWorkspaceId();
  const assigneeId = session!.user.id;

  const tasks = await getTaskList({
    workspaceId,
    assigneeId,
    page,
    pageSize,
  });

  const count = await getTaskCount({
    workspaceId,
    assigneeId,
  });

  if (!count) {
    return (
      <AssignedTasksSection>
        <AssignedTasksSectionHeading />
        <AssignedTasksEmptyCard />
      </AssignedTasksSection>
    );
  }

  const totalPages = Math.ceil(count / pageSize);

  const paginationProps = {
    page,
    totalPages,
    pageSize,
    baseUrl: "/",
  };

  return (
    <>
      <AssignedTasksSection>
        <AssignedTasksSectionHeading />
        <TaskList>
          {tasks.map((task) => (
            <TaskListItem
              key={task.id}
              id={task.id}
              title={task.title}
              deadline={task.deadline}
              category={task.category}
              project={task.project}
              status={{
                id: task.status.id,
                name: task.status.name,
              }}
              assignee={
                task.assignee
                  ? {
                      id: task.assignee.id,
                      imageUrl: task.assignee.imageUrl ?? undefined,
                      fullName: task.assignee.fullName,
                    }
                  : undefined
              }
              comments={task._count.comments}
            />
          ))}
        </TaskList>
      </AssignedTasksSection>
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            {...paginationProps}
            size="large"
            className="max-md:hidden"
          />
          <Pagination {...paginationProps} className="md:hidden" />
        </div>
      )}
    </>
  );
}
