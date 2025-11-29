import {
  AssignedTasksSection,
  AssignedTasksEmptyCard,
  AssignedTasksSectionHeading,
} from "../AssignedTasks";
import { TaskList } from "../TaskList";
import { getTaskList } from "@/lib/queries/task";
import { TaskListItem } from "../TaskListItem";

export async function AssignedTasksServerContainer() {
  const tasks = await getTaskList();

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
