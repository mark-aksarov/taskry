import { ModalManagerProvider } from "@/components/common/ModalManagerContext";
import { DeleteCommentProvider } from "../DeleteCommentProvider";
import { DeleteCommentModal } from "../DeleteCommentModal";

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
