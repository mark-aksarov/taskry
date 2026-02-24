import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { EntityCommentsModal } from "@/components/comments/EntityCommentsModal";

interface TaskCommentsModalProps {
  taskId: number;
  taskCommentsContainer: React.ReactNode;
  sendComment: ActionFn<ActionState, FormData>;
  updateComment: ActionFn<ActionState, FormData>;
}

export function TaskCommentsModal({
  taskId,
  taskCommentsContainer,
  sendComment,
  updateComment,
}: TaskCommentsModalProps) {
  const t = useTranslations("tasks.TaskCommentsModal");

  return (
    <EntityCommentsModal
      entityId={taskId}
      entityKey="taskId"
      mutateUrl={`/api/tasks/${taskId}/comments`}
      title={t("title")}
      commentsContainer={taskCommentsContainer}
      sendComment={sendComment}
      updateComment={updateComment}
    />
  );
}
