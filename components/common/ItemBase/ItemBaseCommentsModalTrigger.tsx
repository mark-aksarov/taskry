"use client";

import { DialogTrigger } from "react-aria-components";
import { CommentButton } from "@/components/comments/CommentButton";

export interface ItemBaseCommentsModalTriggerProps {
  commentsCount: number;
  modal: React.ReactNode;
  "data-test"?: string;
  className?: string;
}

export function ItemBaseCommentsModalTrigger({
  commentsCount,
  "data-test": dataTest,
  modal,
  className,
}: ItemBaseCommentsModalTriggerProps) {
  return (
    <DialogTrigger>
      <CommentButton
        data-test={dataTest}
        label={commentsCount}
        className={className}
      />
      {modal}
    </DialogTrigger>
  );
}
