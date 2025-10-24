import { getTasks } from "@/lib/queries/task";
import { ProfileTaskListItem } from "../ProfileTaskListItem";
import { List } from "@/components/common/List";

export async function ProfileTaskList() {
  const tasks = await getTasks("BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI");

  return (
    <List className="md:gap-0">
      {tasks.map((task) => (
        <ProfileTaskListItem key={task.id} task={task} />
      ))}
    </List>
  );
}
