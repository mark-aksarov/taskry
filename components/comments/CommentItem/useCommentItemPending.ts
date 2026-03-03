import { useCommentFormContext } from "../CommentFormContext";
import { useDeleteComment } from "../DeleteCommentContext";
import { useUpdateComment } from "../UpdateCommentContext";

export function useCommentItemPending(commentId: number) {
  const { isPending: isDeleteCommentPending } = useDeleteComment();
  const { isPending: isUpdateCommentPending } = useUpdateComment();

  const { editCommentId } = useCommentFormContext();

  const isPending =
    isDeleteCommentPending ||
    (isUpdateCommentPending && editCommentId === commentId);

  return isPending;
}
