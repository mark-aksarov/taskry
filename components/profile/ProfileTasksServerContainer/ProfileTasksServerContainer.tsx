import { getTaskList } from "@/lib/queries/task";
import { ProfileTaskList } from "../ProfileTaskList";
import { ProfileTaskListItem } from "../ProfileTaskListItem";

export async function ProfileTasksServerContainer({
  userId,
}: {
  userId: string;
}) {
  const tasks = await getTaskList(userId);

  return (
    <ProfileTaskList>
      {tasks.length &&
        tasks.map((task) => (
          <ProfileTaskListItem
            key={task.id}
            id={task.id}
            title={task.title}
            deadline={task.deadline}
            comments={task._count.comments}
            status={{
              id: task.status.id,
              name: task.status.nameEn,
            }}
          />
        ))}
    </ProfileTaskList>
  );
}
