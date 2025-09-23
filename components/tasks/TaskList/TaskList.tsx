import { TaskItem } from "../TaskItem";
import { getTasks } from "@/lib/queries/task";

export async function TaskList() {
  const tasks = await getTasks();

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
