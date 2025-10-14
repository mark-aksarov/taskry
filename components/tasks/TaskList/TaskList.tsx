import { TaskListItem } from "../TaskListItem";
import { TaskPreview } from "@/lib/queries/types";
import { List } from "@/components/common/List";

interface TaskListProps {
  tasks: TaskPreview[];
  showCheckbox?: boolean;
}

export function TaskList({ tasks, showCheckbox = true }: TaskListProps) {
  return (
    <List>
      {tasks.map((task) => (
        <TaskListItem key={task.id} task={task} showCheckbox={showCheckbox} />
      ))}
    </List>
  );
}
