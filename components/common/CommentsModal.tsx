"use client";

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
import { useEffect, useState } from "react";

interface CommentsModalProps {
  title: string;
  children: React.ReactNode;
}

export function CommentsModal({ title, children }: CommentsModalProps) {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const initialViewportHeight = window.innerHeight;
    const keyboardThreshold = 100;

    const handleResize = () => {
      const currentViewportHeight = window.innerHeight;
      const heightDifference = initialViewportHeight - currentViewportHeight;

      if (heightDifference > keyboardThreshold) {
        setKeyboardOpen(true);
      } else if (Math.abs(heightDifference) < 20) {
        setKeyboardOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ResponsiveModal isDismissable className="w-[600px]">
      <Dialog className="md:max-h-[calc(100dvh-64px)]">
        <DialogHeader>
          <DialogHeading>{title}</DialogHeading>
          <DialogCloseButton iconSize={20} />
        </DialogHeader>
        <DialogBody className="flex flex-col gap-4">{children}</DialogBody>
        <DialogFooter className="max-md:p-0 md:px-4 md:py-3">
          <CommentModalInput />
        </DialogFooter>
      </Dialog>
    </ResponsiveModal>
  );
}
