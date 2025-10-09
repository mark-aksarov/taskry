import { TaskListItem } from "../TaskListItem";
import { TaskPreview } from "@/lib/queries/types";
import { List } from "@/components/common/List";

export function TaskList({ tasks }: { tasks: TaskPreview[] }) {
  return (
    <List>
      {tasks.map((task) => (
        <TaskListItem key={task.id} task={task} showCheckbox />
      ))}
    </List>
  );
}
