"use client";

import {
  CommentsModal,
  CommentsModalDialog,
  CommentsModalDialogBody,
  CommentsModalDialogFooter,
} from "@/components/comments/CommentsModal";

import { DialogHeader } from "@/components/ui/Dialog";
import { useSendComment } from "../SendCommentContext";
import { useUpdateComment } from "../UpdateCommentContext";
import { useCommentFormContext } from "../CommentFormContext";
import { CommentForm } from "@/components/comments/CommentForm";

interface EntityCommentsModalProps {
  title: string;
  commentsContainer: React.ReactNode;
}

export function EntityCommentsModal({
  title,
  commentsContainer,
}: EntityCommentsModalProps) {
  const { editCommentId } = useCommentFormContext();

  // We switch between create/update comment depending on editCommentId
  const { action: sendComment, isPending: isSendPending } = useSendComment();
  const { action: updateComment, isPending: isUpdatePending } =
    useUpdateComment();

  return (
    <CommentsModal>
      <CommentsModalDialog>
        <DialogHeader>{title}</DialogHeader>
        <CommentsModalDialogBody>{commentsContainer}</CommentsModalDialogBody>
        <CommentsModalDialogFooter>
          {editCommentId ? (
            <CommentForm action={updateComment} isPending={isUpdatePending} />
          ) : (
            <CommentForm action={sendComment} isPending={isSendPending} />
          )}
        </CommentsModalDialogFooter>
      </CommentsModalDialog>
    </CommentsModal>
  );
}
