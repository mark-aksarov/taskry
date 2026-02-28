import { ItemBasePendingOverlay } from "../common/ItemBase";
import { useDeleteCommentContext } from "./DeleteCommentContext";

interface CommentItemDeleteOverlayProps {
  children: React.ReactNode;
}

export function CommentItemDeleteOverlay({
  children,
}: CommentItemDeleteOverlayProps) {
  const { isPending } = useDeleteCommentContext();

  return (
    <ItemBasePendingOverlay isPending={isPending}>
      {children}
    </ItemBasePendingOverlay>
  );
}
