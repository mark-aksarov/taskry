"use client";

import { ManageButtonMobile } from "@/dashboard/common/ManageButton";
import { ProjectCategoryManageMenuTrigger } from "./ProjectCategoryManageMenuTrigger";

export function ProjectCategoryManageMenuTriggerMobile() {
  return (
    <ProjectCategoryManageMenuTrigger
      renderButton={() => (
        <ManageButtonMobile data-test="project-category-manage-menu-trigger-mobile" />
      )}
    />
  );
}
