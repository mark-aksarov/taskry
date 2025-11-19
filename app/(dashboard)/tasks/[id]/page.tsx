import { TaskDetailPage } from "./TaskDetailPage";
import { TaskDetailServerContainer } from "@/components/tasks/TaskDetailServerContainer/TaskDetailServerContainer";

export default async function AppTaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <TaskDetailPage
      id={Number(id)}
      TaskDetailContainer={TaskDetailServerContainer}
    />
  );
}
