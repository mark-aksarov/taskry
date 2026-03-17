"use client";

import {
  ProjectSortingMenuTrigger,
  ProjectSortingMenuTriggerProps,
} from "./ProjectSortingMenuTrigger";
import { SortingButtonMobile } from "@/components/common/SortingButton";

export function ProjectSortingMenuTriggerMobile(
  props: Omit<ProjectSortingMenuTriggerProps, "renderButton">,
) {
  return (
    <ProjectSortingMenuTrigger
      {...props}
      renderButton={() => (
        <SortingButtonMobile data-test="project-sorting-menu-trigger-mobile" />
      )}
    />
  );
}
