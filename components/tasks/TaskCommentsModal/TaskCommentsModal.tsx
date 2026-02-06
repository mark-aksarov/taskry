"use client";

import {
  CommentsModal,
  CommentsModalDialog,
  CommentsModalDialogBody,
  CommentsModalDialogFooter,
} from "@/components/comments/CommentsModal";

import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { CommentForm } from "@/components/comments/CommentForm";
import { useCommentFormContext } from "@/components/comments/CommentFormContext";

interface TaskCommentsModalProps {
  taskId: number;
  taskCommentsContainer: React.ReactNode;
  sendCommentAction: ActionFn<ActionState, FormData>;
  updateCommentAction: ActionFn<ActionState, FormData>;
}

export function TaskCommentsModal({
  taskId,
  taskCommentsContainer,
  sendCommentAction,
  updateCommentAction,
}: TaskCommentsModalProps) {
  const t = useTranslations("tasks.TaskCommentsModal");

  const context = useCommentFormContext();

  if (context === null) {
    throw new Error(
      "useCommentFormContext must be used within a CommentFormProvider",
    );
  }

  const { editCommentId } = context;

  return (
    <CommentsModal>
      <CommentsModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <CommentsModalDialogBody>
          {taskCommentsContainer}
        </CommentsModalDialogBody>
        <CommentsModalDialogFooter>
          <CommentForm
            sendCommentAction={
              editCommentId ? updateCommentAction : sendCommentAction
            }
            mutateUrl={`/api/tasks/${taskId}/comments`}
            hiddenInput={
              <input
                type="hidden"
                name={editCommentId ? "id" : "taskId"}
                value={editCommentId ? editCommentId : taskId}
              />
            }
          />
        </CommentsModalDialogFooter>
      </CommentsModalDialog>
    </CommentsModal>
  );
}
