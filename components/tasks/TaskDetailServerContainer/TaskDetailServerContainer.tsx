import { TaskDetail } from "../TaskDetail/TaskDetail";
import { getTaskDetail } from "@/lib/queries/task";

export async function TaskDetailServerContainer({ id }: { id: number }) {
  const task = await getTaskDetail(id);

  return (
    <TaskDetail
      id={task.id}
      title={task.title}
      assignee={
        task.assignee
          ? {
              id: task.assignee.id,
              fullName: task.assignee.fullName,
              imageUrl: task.assignee.imageUrl ?? undefined,
            }
          : undefined
      }
      deadline={task.deadline}
      description={task.description ?? undefined}
      category={task.category}
      project={task.project}
      status={{
        id: task.status.id,
        name: task.status.nameEn,
      }}
      subtasks={task.subtasks}
      attachments={task.attachments}
    />
  );
}
