import { CommentItem } from "@/components/comments/CommentItem";
import { CommentModalInput } from "@/components/comments/CommentModalInput";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";
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
import { commentsMock } from "@/lib/data/__mocks__/comments";
import { MessagesSquare } from "lucide-react";
import { useMediaQuery } from "react-responsive";

export function TaskCommentsModalTrigger({
  commentCount,
  taskId,
}: {
  commentCount: number;
  taskId: number;
}) {
  const comments = commentsMock;

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
            {comments.map((comment) => {
              return <CommentItem key={comment.id} comment={comment} />;
            })}
          </DialogBody>
          <DialogFooter className="px-4 py-3">
            <CommentModalInput />
          </DialogFooter>
        </Dialog>
      </ResponsiveModal>
    </RACDialogTrigger>
  );
}
