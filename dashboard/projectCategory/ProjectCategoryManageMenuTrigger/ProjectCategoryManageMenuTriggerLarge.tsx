"use client";

import { ManageButtonLarge } from "@/dashboard/common/ManageButton";
import { ProjectCategoryManageMenuTrigger } from "./ProjectCategoryManageMenuTrigger";

export function ProjectCategoryManageMenuTriggerLarge() {
  return (
    <ProjectCategoryManageMenuTrigger
      renderButton={() => (
        <ManageButtonLarge data-test="project-category-manage-menu-trigger-large" />
      )}
    />
  );
}
