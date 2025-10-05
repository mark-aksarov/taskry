import { TaskItem } from "../TaskItem";
import { TaskPreview } from "@/lib/queries/types";

export async function TaskList({ tasks }: { tasks: TaskPreview[] }) {
  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
