import { getTasks } from "@/lib/queries/task";
import { ProfileTaskListItem } from "../ProfileTaskListItem";
import { ProfileTasksMobileLayout } from "./ProfileTasksMobileLayout";

export async function ProfileTasksMobileContainer() {
  const tasks = await getTasks("BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI");

  return (
    <ProfileTasksMobileLayout>
      {tasks.map((task) => (
        <ProfileTaskListItem
          key={task.id}
          id={task.id}
          title={task.title}
          deadline={task.deadline}
          comments={task._count.comments}
          subtasks={task._count.subtasks}
          status={{
            id: task.status.id,
            name: task.status.nameEn,
          }}
        />
      ))}
    </ProfileTasksMobileLayout>
  );
}
