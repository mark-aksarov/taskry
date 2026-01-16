"use client";

import {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
  DialogFooter,
} from "@/components/ui";

import { CommentsModalForm } from "./CommentsModalForm";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";

interface CommentsModalProps {
  title: string;
  children: React.ReactNode;
}

export function CommentsModal({ title, children }: CommentsModalProps) {
  return (
    <ResponsiveModal isDismissable className="w-[600px]">
      <Dialog className="md:h-[calc(100dvh-64px)]">
        <DialogHeader>
          <DialogHeading>{title}</DialogHeading>
          <DialogCloseButton />
        </DialogHeader>
        <DialogBody className="flex flex-col gap-4">{children}</DialogBody>
        <DialogFooter className="p-0!">
          <CommentsModalForm />
        </DialogFooter>
      </Dialog>
    </ResponsiveModal>
  );
}
