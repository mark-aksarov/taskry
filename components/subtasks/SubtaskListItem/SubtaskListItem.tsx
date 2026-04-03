"use client";

import { memo } from "react";
import { Check } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { SubtaskActionMenuTrigger } from "../SubtaskActionMenuTrigger";
import { SubtaskListItemPendingOverlay } from "./SubtaskListItemPendingOverlay";

interface SubtaskListItemProps {
  id: number;
  text: string;
  isDone: boolean;
}

export function SubtaskListItem(props: SubtaskListItemProps) {
  return (
    <SubtaskListItemPendingOverlay>
      <SubtaskListItemInner {...props} />
    </SubtaskListItemPendingOverlay>
  );
}

const SubtaskListItemInner = memo(function SubtaskListItemInner({
  id,
  text,
  isDone,
}: Omit<
  SubtaskListItemProps,
  "toggleSubtask" | "updateSubtask" | "deleteSubtask"
>) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-2">
        <Check
          size={16}
          className={twMerge(
            "mt-0.5 shrink-0",
            isDone && "text-blue-600 dark:text-blue-400",
            !isDone && "text-gray-500 dark:text-gray-400",
          )}
        />
        <SubtaskActionMenuTrigger
          subtaskId={id}
          isDone={isDone}
          subtaskText={text}
        />
      </div>
    </div>
  );
});
