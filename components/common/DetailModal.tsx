"use client";

import {
  Button,
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogFooter,
  DialogHeader,
  DialogHeading,
  Modal,
} from "@/components/ui";

interface DetailModalProps {
  title: string;
  children: React.ReactNode;
}

export function DetailModal({ title, children }: DetailModalProps) {
  return (
    <Modal isDismissable className="w-[460px]">
      <Dialog className="max-h-[calc(100dvh-64px)]">
        <DialogHeader>
          <DialogHeading>{title}</DialogHeading>
          <DialogCloseButton iconSize={20} />
        </DialogHeader>
        <DialogBody>{children}</DialogBody>
        <DialogFooter>
          <Button
            variant="primary"
            size="medium"
            label="Open in Full Page"
            className="w-full justify-center"
          />
        </DialogFooter>
      </Dialog>
    </Modal>
  );
}
