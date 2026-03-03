"use client";

import { MessageSquare, Pencil } from "lucide-react";
import { DialogTrigger } from "react-aria-components";
import { NavigationButton } from "@/components/common/NavigationButton";

interface DetailActionsCommentsModalTriggerProps {
  label: React.ReactNode;
  modal: React.ReactNode;
}

export function DetailActionsCommentsModalTrigger(
  props: DetailActionsCommentsModalTriggerProps,
) {
  return <DetailActionsCommentsModalTriggerInner {...props} />;
}

function DetailActionsCommentsModalTriggerInner({
  label,
  modal,
}: DetailActionsCommentsModalTriggerProps) {
  return (
    <DialogTrigger>
      <NavigationButton
        variant="secondary"
        iconLeft={
          <MessageSquare size={18} strokeWidth={1.5} absoluteStrokeWidth />
        }
        label={label}
      />
      {modal}
    </DialogTrigger>
  );
}
