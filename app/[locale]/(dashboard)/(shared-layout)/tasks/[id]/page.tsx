import { notFound } from "next/navigation";
import { taskId } from "@/lib/schemas/task";
import { TaskDetailPage } from "./TaskDetailPage";
import { getTaskSummary } from "@/lib/data/task/task.dal";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { UpdateTaskModal } from "@/components/tasks/UpdateTaskModal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { TaskCommentsModal } from "@/components/tasks/TaskCommentsModal";
import { UpdateTaskProvider } from "@/components/tasks/UpdateTaskProvider";
import { DeleteTaskProvider } from "@/components/tasks/DeleteTaskProvider";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { CreateSubtaskModal } from "@/components/subtasks/CreateSubtaskModal";
import { DeleteTaskDetailModal } from "@/components/tasks/DeleteTaskDetailModal";
import { TaskCommentsContainer } from "@/components/tasks/TaskCommentsContainer";
import { TaskDetailAltContainer } from "@/components/tasks/TaskDetailAltContainer";
import { UpdateTaskFormContainer } from "@/components/tasks/UpdateTaskFormContainer";
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
      <UpdateTaskProvider>
        <DeleteTaskProvider>
          <UpdateTaskStatusProvider>
            <TaskDetailPage
              taskDetailContainer={<TaskDetailAltContainer taskId={id} />}
              taskHeaderContainer={<TaskDetailHeaderContainer taskId={id} />}
            />

            <UpdateTaskModal
              updateTaskFormContainer={<UpdateTaskFormContainer taskId={id} />}
            />

            <DeleteTaskDetailModal
              taskId={taskSummary.id}
              taskTitle={taskSummary.title}
            />

            <TaskCommentsModal
              taskId={taskSummary.id}
              sendComment={sendComment}
              updateComment={updateComment}
              taskCommentsContainer={
                <TaskCommentsContainer taskId={taskSummary.id} />
              }
            />

            <TaskSearchModal
              searchContainer={<LinkSearchContainer pathname="/tasks" />}
            />
            <CreateSubtaskModal taskId={taskSummary.id} />
          </UpdateTaskStatusProvider>
        </DeleteTaskProvider>
      </UpdateTaskProvider>
    </CreateSubtaskAltProvider>
  );
}
