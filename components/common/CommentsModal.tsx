import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";
import { CommentModalInput } from "@/components/comments/CommentModalInput";

interface CommentsModalProps {
  title: string;
  children: React.ReactNode;
}

export function CommentsModal({ title, children }: CommentsModalProps) {
  return (
    <ResponsiveModal isDismissable className="w-[600px]">
      <Dialog className="md:max-h-[calc(100dvh-64px)]">
        <DialogHeader>
          <DialogHeading>{title}</DialogHeading>
          <DialogCloseButton iconSize={20} />
        </DialogHeader>
        <DialogBody className="flex flex-col gap-4">{children}</DialogBody>
        <DialogFooter className="px-4 py-3">
          <CommentModalInput />
        </DialogFooter>
      </Dialog>
    </ResponsiveModal>
  );
}
