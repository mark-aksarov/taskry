"use client";

import { TaskManageMenuTrigger } from "./TaskManageMenuTrigger";
import { ManageButtonMobile } from "@/components/common/ManageButton";

export function TaskManageMenuTriggerMobile() {
  return (
    <TaskManageMenuTrigger
      renderButton={() => (
        <ManageButtonMobile data-test="task-manage-menu-trigger-mobile" />
      )}
    />
  );
}
