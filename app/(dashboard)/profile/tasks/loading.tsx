import { Repeat } from "@/components/common/Repeat";
import { List } from "@/components/common/List";
import { TaskListItem } from "@/components/tasks/TaskListItem";

export default function Loading() {
  return (
    <List>
      <Repeat items={10} renderItem={() => <TaskListItem />} />
    </List>
  );
}
