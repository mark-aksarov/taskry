"use client";

import { ProjectManageMenuTrigger } from "./ProjectManageMenuTrigger";
import { ManageButtonMobile } from "@/dashboard/common/ManageButton";

export function ProjectManageMenuTriggerMobile() {
  return (
    <ProjectManageMenuTrigger
      renderButton={() => (
        <ManageButtonMobile data-test="project-manage-menu-trigger-mobile" />
      )}
    />
  );
}
