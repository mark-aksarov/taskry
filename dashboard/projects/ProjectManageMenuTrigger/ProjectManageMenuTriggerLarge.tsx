"use client";

import { ProjectManageMenuTrigger } from "./ProjectManageMenuTrigger";
import { ManageButtonLarge } from "@/dashboard/common/ManageButton";

export function ProjectManageMenuTriggerLarge() {
  return (
    <ProjectManageMenuTrigger
      renderButton={() => (
        <ManageButtonLarge data-test="project-manage-menu-trigger-large" />
      )}
    />
  );
}
