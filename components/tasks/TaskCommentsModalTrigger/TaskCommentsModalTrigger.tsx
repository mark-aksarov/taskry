import { CommentItem } from "@/components/comments/CommentItem";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";
import { CommentModalInput } from "@/components/comments/CommentModalInput";
import { useCommentsContainer } from "@/components/comments/CommentsContainer";
import {
  Button,
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogFooter,
  DialogHeader,
  DialogHeading,
  RACDialogTrigger,
} from "@/components/ui";
import { MessagesSquare } from "lucide-react";
import { useMediaQuery } from "react-responsive";

export function TaskCommentsModalTrigger({
  commentCount,
  taskId,
}: {
  commentCount: number;
  taskId: number;
}) {
  const CommentsContainer = useCommentsContainer();

  const isMd = useMediaQuery({ query: "(max-width: 48rem)" });

  return (
    <RACDialogTrigger>
      <Button
        variant="outlined"
        label={commentCount}
        className="rounded-full"
        aria-label="Show task comments"
        iconLeft={
          <MessagesSquare size={16} strokeWidth={1.5} absoluteStrokeWidth />
        }
      />
      <ResponsiveModal isDismissable className="w-[600px]">
        <Dialog className={!isMd ? "max-h-[calc(100dvh-64px)]" : ""}>
          <DialogHeader>
            <DialogHeading>Task comments</DialogHeading>
            <DialogCloseButton iconSize={20} />
          </DialogHeader>
          <DialogBody className="flex flex-col gap-4">
            <CommentsContainer taskId={taskId} />
          </DialogBody>
          <DialogFooter className="px-4 py-3">
            <CommentModalInput />
          </DialogFooter>
        </Dialog>
      </ResponsiveModal>
    </RACDialogTrigger>
  );
}
