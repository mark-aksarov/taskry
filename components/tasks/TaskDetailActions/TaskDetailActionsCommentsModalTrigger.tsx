"use client";

import { Pencil } from "lucide-react";
import { DialogTrigger } from "react-aria-components";
import { NavigationButton } from "@/components/common/NavigationButton";
import { CommentFormProvider } from "@/components/comments/CommentFormContext";

interface TaskDetailActionsCommentsModalTriggerProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export function TaskDetailActionsCommentsModalTrigger(
  props: TaskDetailActionsCommentsModalTriggerProps,
) {
  return (
    <CommentFormProvider>
      <TaskDetailActionsCommentsModalTriggerInner {...props} />
    </CommentFormProvider>
  );
}

function TaskDetailActionsCommentsModalTriggerInner({
  children,
  modal,
}: TaskDetailActionsCommentsModalTriggerProps) {
  return (
    <DialogTrigger>
      <NavigationButton variant="secondary">
        <Pencil size={18} strokeWidth={1.5} absoluteStrokeWidth />
        {children}
      </NavigationButton>
      {modal}
    </DialogTrigger>
  );
}
