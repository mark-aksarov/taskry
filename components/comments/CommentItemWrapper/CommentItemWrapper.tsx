import { DeleteCommentModal } from "../DeleteCommentModal";
import { DeleteCommentProvider } from "../DeleteCommentProvider";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { ModalManagerProvider } from "@/components/common/ModalManagerContext";

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

      <GuestModeModal />
    </ModalManagerProvider>
  );
}
