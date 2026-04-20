"use client";

import { TaskManageMenuTrigger } from "./TaskManageMenuTrigger";
import { ManageButtonLarge } from "@/dashboard/common/ManageButton";

export function TaskManageMenuTriggerLarge() {
  return (
    <TaskManageMenuTrigger
      renderButton={() => (
        <ManageButtonLarge data-test="task-manage-menu-trigger-large" />
      )}
    />
  );
}
