import {
  AssignedTasksSection,
  AssignedTasksEmptyCard,
  AssignedTasksSectionHeading,
} from "../AssignedTasks";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { TaskList } from "../TaskList";
import { TaskListItem } from "../TaskListItem";
import { getTaskList } from "@/lib/queries/task";
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";

export async function AssignedTasksServerContainer() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const workspaceId = await getUserWorkspaceId();

  const tasks = await getTaskList({
    workspaceId,
    assigneeId: session!.user.id,
  });

  if (!tasks.length) {
    return (
      <AssignedTasksSection>
        <AssignedTasksSectionHeading />
        <AssignedTasksEmptyCard />
      </AssignedTasksSection>
    );
  }

  return (
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
  );
}
