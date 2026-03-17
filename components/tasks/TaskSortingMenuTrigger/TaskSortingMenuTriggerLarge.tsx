"use client";

import {
  TaskSortingMenuTrigger,
  TaskSortingMenuTriggerProps,
} from "./TaskSortingMenuTrigger";
import { SortingButtonLarge } from "@/components/common/SortingButton";

export function TaskSortingMenuTriggerLarge(
  props: Omit<TaskSortingMenuTriggerProps, "renderButton">,
) {
  return (
    <TaskSortingMenuTrigger
      {...props}
      renderButton={() => (
        <SortingButtonLarge data-test="task-sorting-menu-trigger-large" />
      )}
    />
  );
}
