"use client";

import { memo } from "react";
import { tv } from "tailwind-variants";
import { Check, Circle, CircleCheck } from "lucide-react";
import { SubtaskActionMenuTrigger } from "../SubtaskActionMenuTrigger";
import { SubtaskListItemPendingOverlay } from "./SubtaskListItemPendingOverlay";

export type SubtaskListItemVariant = "plain" | "rich";

interface SubtaskListItemProps {
  id: number;
  text: string;
  isDone: boolean;
  showActionMenu?: boolean;
  variant?: SubtaskListItemVariant;
}

const styles = tv({
  base: "flex items-start gap-2",
  variants: {
    isDone: {
      false: "",
      true: "",
    },
    variant: {
      plain: "",
      rich: "rounded-lg p-3",
    },
  },
  compoundVariants: [
    {
      variant: "plain",
      isDone: true,
      class: "text-black dark:text-white",
    },
    {
      variant: "plain",
      isDone: false,
      class: "text-gray-500 dark:text-gray-400",
    },
    {
      variant: "rich",
      isDone: true,
      class:
        "bg-green-50 text-green-700 dark:bg-green-600/20 dark:text-green-300",
    },
    {
      variant: "rich",
      isDone: false,
      class: "bg-gray-50 text-black dark:bg-gray-700/30 dark:text-white",
    },
  ],
});

const iconStyles = tv({
  base: "mt-0.5 shrink-0",
  variants: {
    isDone: {
      false: "text-gray-500 dark:text-gray-400",
      true: "",
    },
    variant: {
      plain: "",
      rich: "",
    },
  },
  compoundVariants: [
    {
      isDone: true,
      variant: "plain",
      class: "text-blue-600 dark:text-blue-400",
    },
    {
      isDone: true,
      variant: "rich",
      class: "text-green-700 dark:text-green-300",
    },
  ],
});

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
  variant = "plain",
}: Omit<
  SubtaskListItemProps,
  "toggleSubtask" | "updateSubtask" | "deleteSubtask"
>) {
  let icon;

  if (variant === "rich") {
    icon = isDone ? (
      <CircleCheck size={16} className={iconStyles({ isDone, variant })} />
    ) : (
      <Circle size={16} className={iconStyles({ isDone, variant })} />
    );
  } else {
    icon = <Check size={16} className={iconStyles({ isDone, variant })} />;
  }

  return (
    <div
      data-test="subtask-list-item"
      data-id={id}
      className={styles({ isDone, variant })}
    >
      {icon}
      <div className="mr-auto text-sm">{text}</div>
      {showActionMenu && (
        <SubtaskActionMenuTrigger
          subtaskId={id}
          isDone={isDone}
          buttonClassName="bg-transparent!"
        />
      )}
    </div>
  );
});
