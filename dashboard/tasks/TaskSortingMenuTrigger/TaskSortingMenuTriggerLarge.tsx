"use client";

import {
  TaskSortingMenuTrigger,
  TaskSortingMenuTriggerProps,
} from "./TaskSortingMenuTrigger";

import { ButtonVariant } from "@/ui/Button";
import { SortingButtonLarge } from "@/dashboard/common/SortingButton";

interface TaskSortingMenuTriggerLargeProps
  extends Omit<TaskSortingMenuTriggerProps, "renderButton"> {
  showLabel?: boolean;
  buttonVariant?: ButtonVariant;
}

export function TaskSortingMenuTriggerLarge({
  // Extra flag to hide the label on User/Profile Tasks pages
  showLabel,
  buttonVariant,
  ...props
}: TaskSortingMenuTriggerLargeProps) {
  return (
    <TaskSortingMenuTrigger
      {...props}
      renderButton={() => (
        <SortingButtonLarge
          showLabel={showLabel}
          variant={buttonVariant}
          data-test="task-sorting-menu-trigger-large"
        />
      )}
    />
  );
}
