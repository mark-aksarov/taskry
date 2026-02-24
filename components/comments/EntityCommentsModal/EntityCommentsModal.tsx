"use client";

import {
  CommentsModal,
  CommentsModalDialog,
  CommentsModalDialogBody,
  CommentsModalDialogFooter,
} from "@/components/comments/CommentsModal";

import { DialogHeader } from "@/components/ui/Dialog";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { CommentForm } from "@/components/comments/CommentForm";
import { useCommentFormContext } from "@/components/comments/CommentFormContext";

interface EntityCommentsModalProps {
  entityId: number;
  entityKey: string;
  mutateUrl: string;
  title: string;
  commentsContainer: React.ReactNode;
  sendComment: ActionFn<ActionState, FormData>;
  updateComment: ActionFn<ActionState, FormData>;
}

export function EntityCommentsModal({
  entityId,
  entityKey,
  mutateUrl,
  title,
  commentsContainer,
  sendComment,
  updateComment,
}: EntityCommentsModalProps) {
  const context = useCommentFormContext();

  if (context === null) {
    throw new Error(
      "useCommentFormContext must be used within a CommentFormProvider",
    );
  }

  const { editCommentId } = context;

  const action = editCommentId ? updateComment : sendComment;

  const hiddenName = editCommentId ? "id" : entityKey;
  const hiddenValue = editCommentId ? editCommentId : entityId;

  return (
    <CommentsModal>
      <CommentsModalDialog>
        <DialogHeader>{title}</DialogHeader>

        <CommentsModalDialogBody>{commentsContainer}</CommentsModalDialogBody>

        <CommentsModalDialogFooter>
          <CommentForm
            sendCommentAction={action}
            mutateUrl={mutateUrl}
            hiddenInput={
              <input type="hidden" name={hiddenName} value={hiddenValue} />
            }
          />
        </CommentsModalDialogFooter>
      </CommentsModalDialog>
    </CommentsModal>
  );
}
