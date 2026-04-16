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
  showActionMenu?: boolean;
}

export function SubtaskListItem(props: SubtaskListItemProps) {
  return (
    <SubtaskListItemPendingOverlay>
      <SubtaskListItemInner {...props} />
    </SubtaskListItemPendingOverlay>
  );
}

export const SubtaskListItemInner = memo(function SubtaskListItemInner({
  id,
  text,
  isDone,
  showActionMenu = true,
}: Omit<
  SubtaskListItemProps,
  "toggleSubtask" | "updateSubtask" | "deleteSubtask"
>) {
  return (
    <div
      data-test="subtask-list-item"
      data-id={id}
      className="flex items-start gap-2"
    >
      <Check
        size={16}
        className={twMerge(
          "mt-0.5 shrink-0",
          isDone && "text-blue-600 dark:text-blue-400",
          !isDone && "text-gray-500 dark:text-gray-400",
        )}
      />
      <div
        className={twMerge(
          "mr-auto text-sm",
          isDone && "text-black dark:text-white",
          !isDone && "text-gray-500 dark:text-gray-400",
        )}
      >
        {text}
      </div>
      {showActionMenu && (
        <SubtaskActionMenuTrigger subtaskId={id} isDone={isDone} />
      )}
    </div>
  );
});
