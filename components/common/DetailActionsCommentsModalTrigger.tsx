"use client";

import { Pencil } from "lucide-react";
import { DialogTrigger } from "react-aria-components";
import { NavigationButton } from "@/components/common/NavigationButton";
import { CommentFormProvider } from "@/components/comments/CommentFormContext";

interface DetailActionsCommentsModalTriggerProps {
  label: React.ReactNode;
  modal: React.ReactNode;
}

export function DetailActionsCommentsModalTrigger(
  props: DetailActionsCommentsModalTriggerProps,
) {
  return (
    <CommentFormProvider>
      <DetailActionsCommentsModalTriggerInner {...props} />
    </CommentFormProvider>
  );
}

function DetailActionsCommentsModalTriggerInner({
  label,
  modal,
}: DetailActionsCommentsModalTriggerProps) {
  return (
    <DialogTrigger>
      <NavigationButton
        variant="secondary"
        iconLeft={<Pencil size={18} strokeWidth={1.5} absoluteStrokeWidth />}
        label={label}
      />
      {modal}
    </DialogTrigger>
  );
}
