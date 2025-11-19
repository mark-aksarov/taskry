import { getTaskList } from "@/lib/queries/task";
import { ProfileTaskListItem } from "../ProfileTaskListItem";
import { ProfileTasksDesktopLayout } from "../ProfileTasksDesktop";

export async function ProfileTasksDesktopServerContainer() {
  const tasks = await getTaskList("BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI");

  return (
    <ProfileTasksDesktopLayout>
      {tasks.length &&
        tasks.map((task) => (
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
    </ProfileTasksDesktopLayout>
  );
}
