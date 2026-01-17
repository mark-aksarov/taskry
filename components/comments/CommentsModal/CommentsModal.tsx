"use client";

import {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";

import { ResponsiveModal } from "@/components/common/ResponsiveModal";

interface CommentsModalProps {
  title: string;
  commentsContainer: React.ReactNode;
  commentForm: React.ReactNode;
}

export function CommentsModal({
  title,
  commentsContainer,
  commentForm,
}: CommentsModalProps) {
  return (
    <ResponsiveModal isDismissable className="w-[600px]">
      <Dialog className="md:h-[calc(100dvh-64px)]">
        <DialogHeader>
          <DialogHeading>{title}</DialogHeading>
          <DialogCloseButton />
        </DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          {commentsContainer}
        </DialogBody>
        <DialogFooter className="p-0!">{commentForm}</DialogFooter>
      </Dialog>
    </ResponsiveModal>
  );
}
