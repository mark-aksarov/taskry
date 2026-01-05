import { TaskDetailPage } from "./TaskDetailPage";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { TaskDetailFormContainer } from "@/components/tasks/TaskDetailFormContainer";
import { TaskDetailFullContainer } from "@/components/tasks/TaskDetailFullContainer";
import { TaskDetailCardHeadingContainer } from "@/components/tasks/TaskDetailCardHeadingContainer";

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
      TaskDetailCardHeadingContainer={TaskDetailCardHeadingContainer}
      TaskDetailContainer={TaskDetailFullContainer}
      TaskDetailFormContainer={TaskDetailFormContainer}
    />
  );
}
