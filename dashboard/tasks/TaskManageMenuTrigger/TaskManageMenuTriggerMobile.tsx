"use client";

import { TaskManageMenuTrigger } from "./TaskManageMenuTrigger";
import { ManageButtonMobile } from "@/dashboard/common/ManageButton";

export function TaskManageMenuTriggerMobile() {
  return (
    <TaskManageMenuTrigger
      renderButton={() => (
        <ManageButtonMobile data-test="task-manage-menu-trigger-mobile" />
      )}
    />
  );
}
