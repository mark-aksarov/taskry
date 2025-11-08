import { List } from "@/components/common/List";
import { TaskListItem, TaskListItemType } from "../TaskListItem";

interface TaskListProps {
  tasks: TaskListItemType[];
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
