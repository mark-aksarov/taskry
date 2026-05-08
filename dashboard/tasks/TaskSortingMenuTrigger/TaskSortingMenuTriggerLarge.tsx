"use client";

import {
  TaskSortingMenuTrigger,
  TaskSortingMenuTriggerProps,
} from "./TaskSortingMenuTrigger";
import { SortingButtonLarge } from "@/dashboard/common/SortingButton";

interface TaskSortingMenuTriggerLargeProps
  extends Omit<TaskSortingMenuTriggerProps, "renderButton"> {
  showLabel?: boolean;
}

export function TaskSortingMenuTriggerLarge({
  // Extra flag to hide the label on User/Profile Tasks pages
  showLabel,
  ...props
}: TaskSortingMenuTriggerLargeProps) {
  return (
    <TaskSortingMenuTrigger
      {...props}
      renderButton={() => (
        <SortingButtonLarge
          showLabel={showLabel}
          variant="primary"
          data-test="task-sorting-menu-trigger-large"
        />
      )}
    />
  );
}
