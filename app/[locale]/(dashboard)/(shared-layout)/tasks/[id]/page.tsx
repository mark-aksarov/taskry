import { notFound } from "next/navigation";
import { taskId } from "@/lib/schemas/task";
import { TaskDetailPage } from "./TaskDetailPage";
import { getTaskSummary } from "@/lib/data/task/task.dal";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { DeleteTaskProvider } from "@/components/tasks/DeleteTaskProvider";
import { SubtasksContainer } from "@/components/subtasks/SubtasksContainer";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { CreateSubtaskModal } from "@/components/subtasks/CreateSubtaskModal";
import { DeleteTaskDetailModal } from "@/components/tasks/DeleteTaskDetailModal";
import { TaskDetailAltContainer } from "@/components/tasks/TaskDetailAltContainer";
import { CreateSubtaskAltProvider } from "@/components/subtasks/CreateSubtaskProvider";
import { UpdateTaskStatusProvider } from "@/components/tasks/UpdateTaskStatusProvider";
import { TaskDetailHeaderContainer } from "@/components/tasks/TaskDetailHeaderContainer";

export default async function AppTaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireProtectedPage();

  // Validation
  const { id: rawTaskId } = await params;

  const parsed = taskId.safeParse(rawTaskId);
  if (!parsed.success) {
    notFound();
  }
  const id = parsed.data;

  // Get task summary
  const taskSummary = await getTaskSummary(id);

  if (!taskSummary) {
    notFound();
  }

  return (
    <CreateSubtaskAltProvider>
      <DeleteTaskProvider>
        <UpdateTaskStatusProvider>
          <TaskDetailPage
            subtasksContainer={<SubtasksContainer taskId={id} />}
            taskDetailContainer={<TaskDetailAltContainer taskId={id} />}
            taskHeaderContainer={<TaskDetailHeaderContainer taskId={id} />}
          />

          <DeleteTaskDetailModal
            taskId={taskSummary.id}
            taskTitle={taskSummary.title}
          />

          <TaskSearchModal
            searchContainer={<LinkSearchContainer pathname="/tasks" />}
          />
          <CreateSubtaskModal taskId={taskSummary.id} />
        </UpdateTaskStatusProvider>
      </DeleteTaskProvider>
    </CreateSubtaskAltProvider>
  );
}
