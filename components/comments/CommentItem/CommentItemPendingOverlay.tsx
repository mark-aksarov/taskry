import { ItemBasePendingOverlay } from "@/components/common/ItemBase";
import { useCommentItemPending } from "./useCommentItemPending";

interface CommentItemPendingOverlayProps {
  commentId: number;
  children: React.ReactNode;
}

export function CommentItemPendingOverlay({
  commentId,
  children,
}: CommentItemPendingOverlayProps) {
  const isPending = useCommentItemPending(commentId);

  return (
    <ItemBasePendingOverlay isPending={isPending}>
      {children}
    </ItemBasePendingOverlay>
  );
}
