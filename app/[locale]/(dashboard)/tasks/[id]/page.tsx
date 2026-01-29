import { TaskDetailPage } from "./TaskDetailPage";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { TaskDetailAltContainer } from "@/components/tasks/TaskDetailAltContainer";
import { TaskDetailHeaderContainer } from "@/components/tasks/TaskDetailHeaderContainer";

export default async function AppProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireProtectedPage();

  const { id } = await params;

  return (
    <TaskDetailPage
      taskDetailContainer={<TaskDetailAltContainer taskId={Number(id)} />}
      taskHeaderContainer={<TaskDetailHeaderContainer taskId={Number(id)} />}
    />
  );
}
