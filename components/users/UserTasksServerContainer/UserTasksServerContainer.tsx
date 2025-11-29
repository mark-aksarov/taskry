import { UserTaskList } from "../UserTaskList";
import { getTaskList } from "@/lib/queries/task";
import { UserTaskListItem } from "../UserTaskListItem";

export async function UserTasksServerContainer({ userId }: { userId: string }) {
  const tasks = await getTaskList(userId);

  return (
    <UserTaskList>
      {tasks.length &&
        tasks.map((task) => (
          <UserTaskListItem
            key={task.id}
            id={task.id}
            title={task.title}
            deadline={task.deadline}
            comments={task._count.comments}
            status={{
              id: task.status.id,
              name: task.status.name,
            }}
          />
        ))}
    </UserTaskList>
  );
}
