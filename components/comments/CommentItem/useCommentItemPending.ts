import { useCommentFormContext } from "../CommentFormContext";
import { useDeleteCommentTransition } from "../DeleteCommentTransitionContext";
import { useSendCommentTransition } from "../SendCommentTransitionContext";

export function useCommentItemPending(commentId: number) {
  const { isPending: isDeleteCommentPending } = useDeleteCommentTransition();
  const { isPending: isSendCommentPending } = useSendCommentTransition();

  const { editCommentId } = useCommentFormContext();

  const isPending =
    isDeleteCommentPending ||
    (isSendCommentPending && editCommentId === commentId);

  return isPending;
}
