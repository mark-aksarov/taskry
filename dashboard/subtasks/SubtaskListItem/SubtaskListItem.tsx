"use client";

import { memo } from "react";
import { tv } from "tailwind-variants";
import { Check, Circle, CircleCheck } from "lucide-react";
import { SubtaskActionMenuTrigger } from "../SubtaskActionMenuTrigger";
import { useSubtaskListItemPending } from "./useSubtaskListItemPending";

export type SubtaskListItemVariant = "plain" | "rich";

interface Props {
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
      class: "text-(--text-primary)",
    },
    {
      variant: "plain",
      isDone: false,
      class: "text-(--text-secondary)",
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
      class: "bg-gray-50 text-(--text-primary) dark:bg-gray-700/30",
    },
  ],
});

const iconStyles = tv({
  base: "mt-0.5 shrink-0",
  variants: {
    isDone: {
      false: "text-(--text-secondary)",
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
      class: "text-(--text-tertiary)",
    },
    {
      isDone: true,
      variant: "rich",
      class: "text-green-700 dark:text-green-300",
    },
  ],
});

export function SubtaskListItem(props: Props) {
  const isPending = useSubtaskListItemPending();
  return <SubtaskListItemInner {...props} isPending={isPending} />;
}

type InnerProps = Props & { isPending?: boolean };

export const SubtaskListItemInner = memo(function SubtaskListItemInner({
  id,
  text,
  isDone,
  showActionMenu = true,
  variant = "plain",
  isPending,
}: InnerProps) {
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
      className={styles({
        isDone,
        variant,
        className: isPending ? "*:opacity-50" : "",
      })}
    >
      {icon}
      <div className="mr-auto text-sm">{text}</div>
      {showActionMenu && (
        <SubtaskActionMenuTrigger subtaskId={id} isDone={isDone} />
      )}
    </div>
  );
});
