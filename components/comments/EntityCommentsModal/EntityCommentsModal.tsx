"use client";

import {
  CommentsModal,
  CommentsModalDialog,
  CommentsModalDialogBody,
  CommentsModalDialogFooter,
} from "@/components/comments/CommentsModal";

import { useSendComment } from "../SendCommentContext";
import { useUpdateComment } from "../UpdateCommentContext";
import { useCommentFormContext } from "../CommentFormContext";
import { CommentForm } from "@/components/comments/CommentForm";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface EntityCommentsModalProps {
  title: string;
  commentsContainer: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export function EntityCommentsModal({
  title,
  commentsContainer,
  ...props
}: EntityCommentsModalProps) {
  const { editCommentId } = useCommentFormContext();

  // We switch between create/update comment depending on editCommentId
  const { action: sendComment, isPending: isSendPending } = useSendComment();
  const { action: updateComment, isPending: isUpdatePending } =
    useUpdateComment();

  return (
    <CommentsModal {...props}>
      <CommentsModalDialog>
        <DialogHeaderWithClose>{title}</DialogHeaderWithClose>
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
