import { auth } from "@/lib/auth";
import { TaskList } from "../TaskList";
import { TaskGrid } from "../TaskGrid";
import { headers } from "next/headers";
import { TaskListItem } from "../TaskListItem";
import { TaskGridItem } from "../TaskGridItem";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { getWorkspaceIdByUserId } from "@/lib/queries/workspace";
import { getTaskList, GetTaskListType } from "@/lib/queries/task";

export async function TasksServerContainer() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const workspaceId = await getWorkspaceIdByUserId(session!.user.id);
  const tasks = await getTaskList({ workspaceId });

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

  return (
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
  );
}
