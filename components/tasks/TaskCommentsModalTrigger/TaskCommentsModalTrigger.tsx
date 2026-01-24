"use client";

import {
  CommentsModal,
  CommentsModalDialog,
  CommentsModalDialogBody,
  CommentsModalDialogFooter,
} from "@/components/comments/CommentsModal";

import {
  CommentFormProvider,
  useCommentFormContext,
} from "@/components/comments/CommentFormContext";

import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";
import { DialogTrigger } from "react-aria-components";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { CommentForm } from "@/components/comments/CommentForm";
import { CommentButton } from "@/components/comments/CommentButton";

interface TaskCommentsModalTriggerProps {
  taskId: number;
  commentsCount: number;
  taskCommentsContainer: React.ReactNode;
  sendCommentAction: ActionFn<ActionState, FormData>;
  updateCommentAction: ActionFn<ActionState, FormData>;
}

export function TaskCommentsModalTrigger(props: TaskCommentsModalTriggerProps) {
  return (
    <CommentFormProvider>
      <TaskCommentsModalTriggerInner {...props} />
    </CommentFormProvider>
  );
}

function TaskCommentsModalTriggerInner({
  taskId,
  commentsCount,
  taskCommentsContainer,
  sendCommentAction,
  updateCommentAction,
}: TaskCommentsModalTriggerProps) {
  const t = useTranslations("tasks.TaskCommentsModal");

  const { editCommentId } = useCommentFormContext();

  return (
    <DialogTrigger>
      <CommentButton
        data-test="task-comments-modal-trigger"
        label={commentsCount}
      />

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
    </DialogTrigger>
  );
}
