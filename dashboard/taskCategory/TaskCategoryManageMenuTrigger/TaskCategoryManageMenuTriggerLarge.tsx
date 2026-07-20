"use client";

import { ManageButtonLarge } from "@/dashboard/common/ManageButton";
import { TaskCategoryManageMenuTrigger } from "./TaskCategoryManageMenuTrigger";

export function TaskCategoryManageMenuTriggerLarge() {
  return (
    <TaskCategoryManageMenuTrigger
      renderButton={() => (
        <ManageButtonLarge data-test="task-category-manage-menu-trigger-large" />
      )}
    />
  );
}
