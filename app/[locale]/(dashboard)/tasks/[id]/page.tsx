import { TaskDetailPage } from "./TaskDetailPage";
import { TaskDetailFullServerContainer } from "@/components/tasks/TaskDetailFullServerContainer";
import { TaskDetailCardHeadingServerContainer } from "@/components/tasks/TaskDetailCardHeadingServerContainer";
import { TaskDetailFormServerContainer } from "@/components/tasks/TaskDetailFormServerContainer/TaskDetailFormServerContainer";

export default async function AppTaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <TaskDetailPage
      id={Number(id)}
      TaskDetailCardHeadingServerContainer={
        TaskDetailCardHeadingServerContainer
      }
      TaskDetailContainer={TaskDetailFullServerContainer}
      TaskDetailFormContainer={TaskDetailFormServerContainer}
    />
  );
}
