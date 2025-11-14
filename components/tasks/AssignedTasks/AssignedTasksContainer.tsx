import { TaskList } from "../TaskList";
import { getTasks } from "@/lib/queries/task";
import { TaskListItem } from "../TaskListItem";
import { AssignedTasksSection } from "./AssignedTasksSection";
import { AssignedTasksEmptyCard } from "./AssignedTasksEmptyCard";
import { AssignedTasksSectionHeading } from "./AssignedTasksSectionHeading";

export async function AssignedTasksContainer() {
  const tasks = await getTasks();

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
              name: task.status.nameEn,
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
            subtasks={task._count.subtasks}
          />
        ))}
      </TaskList>
    </AssignedTasksSection>
  );
}
