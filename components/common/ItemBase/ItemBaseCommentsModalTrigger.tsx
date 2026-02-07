"use client";

import { DialogTrigger } from "react-aria-components";
import { CommentButton } from "@/components/comments/CommentButton";
import { CommentFormProvider } from "@/components/comments/CommentFormContext";

export interface ItemBaseCommentsModalTriggerProps {
  commentsCount: number;
  modal: React.ReactNode;
  "data-test"?: string;
}

export function ItemBaseCommentsModalTrigger(
  props: ItemBaseCommentsModalTriggerProps,
) {
  return (
    <CommentFormProvider>
      <ItemBaseCommentsModalTriggerInner {...props} />
    </CommentFormProvider>
  );
}

function ItemBaseCommentsModalTriggerInner({
  commentsCount,
  "data-test": dataTest,
  modal,
}: ItemBaseCommentsModalTriggerProps) {
  return (
    <DialogTrigger>
      <CommentButton data-test={dataTest} label={commentsCount} />
      {modal}
    </DialogTrigger>
  );
}
