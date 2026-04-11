import { notFound } from "next/navigation";
import { taskId } from "@/lib/schemas/task";
import { TaskDetailPage } from "./TaskDetailPage";
import { getTaskFormData } from "@/lib/data/task/task.dal";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { DeleteTaskProvider } from "@/components/tasks/DeleteTaskProvider";
import { SubtasksContainer } from "@/components/subtasks/SubtasksContainer";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { CreateSubtaskModal } from "@/components/subtasks/CreateSubtaskModal";
import { UpdateTaskTitleModal } from "@/components/tasks/UpdateTaskTitleModal";
import { DeleteTaskDetailModal } from "@/components/tasks/DeleteTaskDetailModal";
import { TaskDetailAltContainer } from "@/components/tasks/TaskDetailAltContainer";
import { UpdateTaskTitleProvider } from "@/components/tasks/UpdateTaskTitleProvider";
import { CreateSubtaskAltProvider } from "@/components/subtasks/CreateSubtaskProvider";
import { UpdateTaskStatusProvider } from "@/components/tasks/UpdateTaskStatusProvider";
import { TaskDetailHeaderContainer } from "@/components/tasks/TaskDetailHeaderContainer";
import { UpdateTaskDescriptionProvider } from "@/components/tasks/UpdateTaskDescriptionProvider";
import { UpdateTaskDescriptionModal } from "@/components/tasks/UpdateTaskDescriptionModal";

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
  const taskFormData = await getTaskFormData(id);

  if (!taskFormData) {
    notFound();
  }

  return (
    <CreateSubtaskAltProvider>
      <DeleteTaskProvider>
        <UpdateTaskStatusProvider>
          <UpdateTaskTitleProvider>
            <UpdateTaskDescriptionProvider>
              <TaskDetailPage
                subtasksContainer={<SubtasksContainer taskId={id} />}
                taskDetailContainer={<TaskDetailAltContainer taskId={id} />}
                taskHeaderContainer={<TaskDetailHeaderContainer taskId={id} />}
              />

              <DeleteTaskDetailModal
                taskId={taskFormData.id}
                taskTitle={taskFormData.title}
              />

              <UpdateTaskTitleModal
                taskId={taskFormData.id}
                taskTitle={taskFormData.title}
              />

              <UpdateTaskDescriptionModal
                taskId={taskFormData.id}
                taskDescription={taskFormData.description}
              />

              <TaskSearchModal
                searchContainer={<LinkSearchContainer pathname="/tasks" />}
              />

              <CreateSubtaskModal taskId={taskFormData.id} />
            </UpdateTaskDescriptionProvider>
          </UpdateTaskTitleProvider>
        </UpdateTaskStatusProvider>
      </DeleteTaskProvider>
    </CreateSubtaskAltProvider>
  );
}
