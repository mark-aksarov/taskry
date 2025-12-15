import { TaskDetailPage } from "./TaskDetailPage";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { TaskDetailFullServerContainer } from "@/components/tasks/TaskDetailFullServerContainer";
import { TaskDetailFormServerContainer } from "@/components/tasks/TaskDetailFormServerContainer";
import { TaskDetailCardHeadingServerContainer } from "@/components/tasks/TaskDetailCardHeadingServerContainer";

export default async function AppTaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireProtectedPage();
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
