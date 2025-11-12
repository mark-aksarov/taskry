import { TaskList } from "../TaskList";
import { TaskGrid } from "../TaskGrid";
import { getTasks, GetTasksType } from "@/lib/queries/task";
import { TaskListItem } from "../TaskListItem";
import { TaskGridItem } from "../TaskGridItem";
import { ViewModeContainer } from "@/components/common/ViewMode";

export async function TaskViewModeContainer() {
  const tasks = await getTasks();

  const commonProps = (task: GetTasksType[number]) => ({
    id: task.id,
    title: task.title,
    deadline: task.deadline,
    totalSubtasks: task.subtasks.length,
    subtasksDone: task.subtasks.filter((s) => s.isDone).length,
    assignee: task.assignee
      ? {
          id: task.assignee.id,
          imageUrl: task.assignee.imageUrl ?? undefined,
          fullName: task.assignee.fullName,
        }
      : undefined,
  });

  return (
    <ViewModeContainer
      list={
        <TaskList>
          {tasks.map((task) => (
            <TaskListItem
              key={task.id}
              {...commonProps(task)}
              category={task.category}
              project={task.project}
              status={{
                id: task.status.id,
                name: task.status.nameEn,
              }}
              commentsCount={task._count.comments}
              subtasksCount={task._count.subtasks}
            />
          ))}
        </TaskList>
      }
      grid={
        <TaskGrid>
          {tasks.map((task) => (
            <TaskGridItem key={task.id} {...commonProps(task)} />
          ))}
        </TaskGrid>
      }
    />
  );
}
