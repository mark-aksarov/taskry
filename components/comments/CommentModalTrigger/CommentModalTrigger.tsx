import {
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogHeader,
  DialogHeading,
  Divider,
  Modal,
  RACDialogTrigger,
} from "@/components/ui";
import { CommentItem, CommentItemActions } from "../CommentItem";
import { CommentButton } from "../CommentButton/CommentButton";
import { Heart, MessageSquare, Reply } from "lucide-react";
import { getCommentWithReplies } from "@/lib/queries/comments";

interface CommentModalProps {
  fullscreen?: boolean;
  commentId: number;
}

export async function CommentModalTrigger({
  fullscreen,
  commentId,
}: CommentModalProps) {
  const comment = await getCommentWithReplies(
    commentId,
    "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
  );

  return (
    <RACDialogTrigger>
      <CommentButton
        icon={<MessageSquare size={16} strokeWidth={1.5} absoluteStrokeWidth />}
        label={comment._count.replies}
        aria-label="Show replies"
      />
      <Modal isDismissable fullscreen={fullscreen}>
        <Dialog className={!fullscreen ? "max-h-[calc(100dvh-64px)]" : ""}>
          <DialogHeader>
            <DialogHeading>Modal title</DialogHeading>
            <DialogCloseButton iconSize={20} />
          </DialogHeader>
          <DialogBody className="flex flex-col gap-4">
            <CommentItem
              comment={comment}
              renderActions={() => {
                const isLiked = comment && comment.likes.length > 0;

                return (
                  <CommentItemActions>
                    <CommentButton
                      icon={
                        <Heart
                          size={16}
                          strokeWidth={1.5}
                          absoluteStrokeWidth
                        />
                      }
                      label={comment._count.likes}
                      aria-label="Like comment"
                      color={isLiked ? "red" : "default"}
                      fill={isLiked}
                    />
                  </CommentItemActions>
                );
              }}
            />
            <div className="ml-12 flex flex-col gap-4">
              <Divider />
              {comment.replies?.map((reply, index) => {
                const isLiked = reply.likes.length > 0;

                return (
                  <>
                    <CommentItem
                      key={reply.id}
                      comment={reply}
                      renderActions={() => {
                        return (
                          <CommentItemActions>
                            <CommentButton
                              icon={
                                <Reply
                                  size={16}
                                  strokeWidth={1.5}
                                  absoluteStrokeWidth
                                />
                              }
                              label="Reply"
                            />
                            <CommentButton
                              icon={
                                <Heart
                                  size={16}
                                  strokeWidth={1.5}
                                  absoluteStrokeWidth
                                />
                              }
                              label={reply._count.likes}
                              aria-label="Like comment"
                              color={isLiked ? "red" : "default"}
                              fill={isLiked}
                            />
                          </CommentItemActions>
                        );
                      }}
                    />
                    {index !== comment.replies.length - 1 && <Divider />}
                  </>
                );
              })}
            </div>
          </DialogBody>
        </Dialog>
      </Modal>
    </RACDialogTrigger>
  );
}
