import { TaskItem } from "../TaskItem";
import { getTasks } from "@/lib/queries/task";
import {
  EmptyView,
  EmptyViewDescription,
  EmptyViewLink,
  EmptyViewTitle,
} from "@/components/common/EmptyView";

export async function TaskList() {
  const tasks = await getTasks();

  if (!tasks.length) {
    return (
      <div className="flex w-full items-center justify-center max-md:py-10 md:py-20">
        <EmptyView>
          <EmptyViewTitle className="text-2xl!">No tasks yet</EmptyViewTitle>
          <EmptyViewDescription>
            Create a new task to keep track of your work
          </EmptyViewDescription>
          <EmptyViewLink href="#">New Task</EmptyViewLink>
        </EmptyView>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
