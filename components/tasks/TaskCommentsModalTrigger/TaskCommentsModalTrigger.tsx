"use client";

import { DialogTrigger } from "react-aria-components";
import { CommentButton } from "@/components/comments/CommentButton";
import { CommentFormProvider } from "@/components/comments/CommentFormContext";

interface TaskCommentsModalTriggerProps {
  commentsCount: number;
  modal: React.ReactNode;
}

export function TaskCommentsModalTrigger(props: TaskCommentsModalTriggerProps) {
  return (
    <CommentFormProvider>
      <TaskCommentsModalTriggerInner {...props} />
    </CommentFormProvider>
  );
}

function TaskCommentsModalTriggerInner({
  commentsCount,
  modal,
}: TaskCommentsModalTriggerProps) {
  return (
    <DialogTrigger>
      <CommentButton
        data-test="task-comments-modal-trigger"
        label={commentsCount}
      />
      {modal}
    </DialogTrigger>
  );
}
