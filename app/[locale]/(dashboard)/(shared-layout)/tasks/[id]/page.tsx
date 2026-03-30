import { notFound } from "next/navigation";
import { taskId } from "@/lib/schemas/task";
import { TaskDetailPage } from "./TaskDetailPage";
import { getTaskSummary } from "@/lib/data/task/task.dal";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { UpdateTaskModal } from "@/components/tasks/UpdateTaskModal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { TaskCommentsModal } from "@/components/tasks/TaskCommentsModal";
import { UpdateTaskProvider } from "@/components/tasks/UpdateTaskProvider";
import { DeleteTaskProvider } from "@/components/tasks/DeleteTaskProvider";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { CreateSubtaskModal } from "@/components/subtasks/CreateSubtaskModal";
import { CommentFormProvider } from "@/components/comments/CommentFormContext";
import { SendCommentProvider } from "@/components/comments/SendCommentProvider";
import { DeleteTaskDetailModal } from "@/components/tasks/DeleteTaskDetailModal";
import { TaskCommentsContainer } from "@/components/tasks/TaskCommentsContainer";
import { TaskDetailAltContainer } from "@/components/tasks/TaskDetailAltContainer";
import { UpdateCommentProvider } from "@/components/comments/UpdateCommentProvider";
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
            <CommentFormProvider
              entityId={taskSummary.id}
              entityKey="taskId"
              mutateUrl={`/api/tasks/${taskId}/comments`}
            >
              <SendCommentProvider>
                <UpdateCommentProvider>
                  <TaskDetailPage
                    taskDetailContainer={<TaskDetailAltContainer taskId={id} />}
                    taskHeaderContainer={
                      <TaskDetailHeaderContainer taskId={id} />
                    }
                  />

                  <UpdateTaskModal
                    updateTaskFormContainer={
                      <UpdateTaskFormContainer taskId={id} />
                    }
                  />

                  <DeleteTaskDetailModal
                    taskId={taskSummary.id}
                    taskTitle={taskSummary.title}
                  />

                  <TaskCommentsModal
                    taskCommentsContainer={
                      <TaskCommentsContainer taskId={taskSummary.id} />
                    }
                  />

                  <TaskSearchModal
                    searchContainer={<LinkSearchContainer pathname="/tasks" />}
                  />
                  <CreateSubtaskModal taskId={taskSummary.id} />
                </UpdateCommentProvider>
              </SendCommentProvider>
            </CommentFormProvider>
          </UpdateTaskStatusProvider>
        </DeleteTaskProvider>
      </UpdateTaskProvider>
    </CreateSubtaskAltProvider>
  );
}
