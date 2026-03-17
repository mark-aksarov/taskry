"use client";

import { TaskManageMenuTrigger } from "./TaskManageMenuTrigger";
import { ManageButtonLarge } from "@/components/common/ManageButton";

export function TaskManageMenuTriggerLarge() {
  return (
    <TaskManageMenuTrigger
      renderButton={() => (
        <ManageButtonLarge data-test="task-manage-menu-trigger-large" />
      )}
    />
  );
}
