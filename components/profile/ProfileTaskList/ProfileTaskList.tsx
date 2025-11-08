import { List } from "@/components/common/List";
import {
  ProfileTaskListItem,
  ProfileTaskListItemType,
} from "../ProfileTaskListItem";

export function ProfileTaskList({
  tasks,
  className,
}: {
  tasks: ProfileTaskListItemType[];
  className?: string;
}) {
  return (
    <List className={className}>
      {tasks.map((task) => (
        <ProfileTaskListItem key={task.id} task={task} />
      ))}
    </List>
  );
}
