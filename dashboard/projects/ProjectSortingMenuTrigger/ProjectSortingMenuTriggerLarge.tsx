"use client";

import {
  ProjectSortingMenuTrigger,
  ProjectSortingMenuTriggerProps,
} from "./ProjectSortingMenuTrigger";
import { SortingButtonLarge } from "@/dashboard/common/SortingButton";

export function ProjectSortingMenuTriggerLarge(
  props: Omit<ProjectSortingMenuTriggerProps, "renderButton">,
) {
  return (
    <ProjectSortingMenuTrigger
      {...props}
      renderButton={() => (
        <SortingButtonLarge data-test="project-sorting-menu-trigger-large" />
      )}
    />
  );
}
