import { DeleteCommentModal } from "../DeleteCommentModal";
import { DeleteCommentProvider } from "../DeleteCommentProvider";
import { ModalManagerProvider } from "@/common/ModalManagerContext";

interface CommentItemWrapperProps {
  commentId: number;
  children: React.ReactNode;
}

export function CommentItemWrapper({
  commentId,
  children,
}: CommentItemWrapperProps) {
  return (
    <ModalManagerProvider>
      <DeleteCommentProvider>
        {children}

        <DeleteCommentModal commentId={commentId} />
      </DeleteCommentProvider>
    </ModalManagerProvider>
  );
}
