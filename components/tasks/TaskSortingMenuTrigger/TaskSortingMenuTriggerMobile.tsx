"use client";

import {
  TaskSortingMenuTrigger,
  TaskSortingMenuTriggerProps,
} from "./TaskSortingMenuTrigger";
import { SortingButtonMobile } from "@/components/common/SortingButton";

export function TaskSortingMenuTriggerMobile(
  props: Omit<TaskSortingMenuTriggerProps, "renderButton">,
) {
  return (
    <TaskSortingMenuTrigger
      {...props}
      renderButton={() => (
        <SortingButtonMobile data-test="task-sorting-menu-trigger-mobile" />
      )}
    />
  );
}
