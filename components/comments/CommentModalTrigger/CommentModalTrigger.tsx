"use client";

import {
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogHeader,
  DialogHeading,
  Divider,
  RACDialogTrigger,
} from "@/components/ui";
import { Fragment } from "react";
import { CommentItem, CommentItemActions } from "../CommentItem";
import { CommentButton } from "../CommentButton/CommentButton";
import { Heart, MessageSquare, Reply } from "lucide-react";
//import { getCommentWithReplies } from "@/lib/queries/comments";
import { DialogFooter } from "@/components/ui/Dialog/Dialog";
import { CommentModalInput } from "../CommentModalInput";
import { commentWithRepliesMock } from "@/lib/data/__mocks__/comments";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";
import { useMediaQuery } from "react-responsive";

interface CommentModalProps {
  commentId: number;
}

export function CommentModalTrigger({ commentId }: CommentModalProps) {
  const comment = commentWithRepliesMock;

  const isMd = useMediaQuery({ query: "(max-width: 48rem)" });

  return (
    <RACDialogTrigger>
      <CommentButton
        icon={<MessageSquare size={16} strokeWidth={1.5} absoluteStrokeWidth />}
        label={comment._count.replies}
        aria-label="Show replies"
      />
      <ResponsiveModal isDismissable className="w-[750px]">
        <Dialog className={!isMd ? "max-h-[calc(100dvh-64px)]" : ""}>
          <DialogHeader>
            <DialogHeading>All comments</DialogHeading>
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
                  <Fragment key={reply.id}>
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
                  </Fragment>
                );
              })}
            </div>
          </DialogBody>
          <DialogFooter className="px-4 py-3">
            <CommentModalInput />
          </DialogFooter>
        </Dialog>
      </ResponsiveModal>
    </RACDialogTrigger>
  );
}
