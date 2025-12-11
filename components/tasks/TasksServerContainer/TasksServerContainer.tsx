import { auth } from "@/lib/auth";
import { TaskList } from "../TaskList";
import { TaskGrid } from "../TaskGrid";
import { headers } from "next/headers";
import { TaskListItem } from "../TaskListItem";
import { TaskGridItem } from "../TaskGridItem";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { getWorkspaceIdByUserId } from "@/lib/queries/workspace";
import { getTaskCount, getTaskList, GetTaskListType } from "@/lib/queries/task";
import { Pagination } from "@/components/common/Pagination";

interface TasksServerContainerProps {
  page: number;
  pageSize: number;
}

export async function TasksServerContainer({
  page,
  pageSize,
}: TasksServerContainerProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const workspaceId = await getWorkspaceIdByUserId(session!.user.id);
  const tasks = await getTaskList({ page, pageSize, workspaceId });
  const count = await getTaskCount({ workspaceId });

  const commonProps = (task: GetTaskListType[number]) => ({
    id: task.id,
    title: task.title,
    deadline: task.deadline,
    assignee: task.assignee
      ? {
          id: task.assignee.id,
          imageUrl: task.assignee.imageUrl ?? undefined,
          fullName: task.assignee.fullName,
        }
      : undefined,
    status: {
      id: task.status.id,
      name: task.status.name,
    },
    comments: task._count.comments,
    subtasks: task._count.subtasks,
  });

  const totalPages = Math.ceil(count / pageSize);

  const paginationProps = {
    page,
    totalPages,
    pageSize,
    baseUrl: "/tasks",
  };

  return (
    <>
      <ViewModeLayout
        list={
          <TaskList>
            {tasks.map((task) => (
              <TaskListItem
                key={task.id}
                {...commonProps(task)}
                category={task.category}
                project={task.project}
                showCheckbox
              />
            ))}
          </TaskList>
        }
        grid={
          <TaskGrid>
            {tasks.map((task) => (
              <TaskGridItem
                key={task.id}
                subtasksDone={task.subtasks.filter((s) => s.isDone).length}
                {...commonProps(task)}
              />
            ))}
          </TaskGrid>
        }
      />
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
