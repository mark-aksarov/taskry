"use client";

import { useTranslations } from "next-intl";
import { useModal } from "../common/ModalManagerContext";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { CommentFormProvider } from "../comments/CommentFormContext";
import { SendCommentProvider } from "../comments/SendCommentContext";
import { EntityCommentsModal } from "../comments/EntityCommentsModal";
import { UpdateCommentProvider } from "../comments/UpdateCommentContext";

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
  const { isOpen, onOpenChange } = useModal("taskComments");

  return (
    <CommentFormProvider
      entityId={taskId}
      entityKey="taskId"
      mutateUrl={`/api/tasks/${taskId}/comments`}
    >
      <SendCommentProvider sendComment={sendComment}>
        <UpdateCommentProvider updateComment={updateComment}>
          <EntityCommentsModal
            title={t("title")}
            commentsContainer={taskCommentsContainer}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          />
        </UpdateCommentProvider>
      </SendCommentProvider>
    </CommentFormProvider>
  );
}
