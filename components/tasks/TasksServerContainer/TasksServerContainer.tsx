import { TaskList } from "../TaskList";
import { TaskGrid } from "../TaskGrid";
import { getTasks, GetTasksType } from "@/lib/queries/task";
import { TaskListItem } from "../TaskListItem";
import { TaskGridItem } from "../TaskGridItem";
import { ViewModeLayout } from "@/components/common/ViewMode";

export async function TasksServerContainer() {
  const tasks = await getTasks();

  const commonProps = (task: GetTasksType[number]) => ({
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
      name: task.status.nameEn,
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
