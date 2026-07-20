"use client";

import { ManageButtonMobile } from "@/dashboard/common/ManageButton";
import { TaskCategoryManageMenuTrigger } from "./TaskCategoryManageMenuTrigger";

export function TaskCategoryManageMenuTriggerMobile() {
  return (
    <TaskCategoryManageMenuTrigger
      renderButton={() => (
        <ManageButtonMobile data-test="task-category-manage-menu-trigger-mobile" />
      )}
    />
  );
}
