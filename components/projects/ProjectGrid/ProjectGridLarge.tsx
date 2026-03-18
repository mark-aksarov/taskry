"use client";

import { Children } from "react";
import { GridLarge } from "@/components/common/Grid";
import { useViewMode } from "@/components/common/ViewMode";
import { ProjectGridLargeSkeleton } from "./ProjectGridLargeSkeleton";
import { usePageTransition } from "@/components/common/PageTransitionContext";

interface ProjectGridLargeProps {
  children: React.ReactNode;
}

export function ProjectGridLarge({ children }: ProjectGridLargeProps) {
  const { isPending: isViewModePending } = useViewMode();
  const { isPending: isPageTransitionPending } = usePageTransition();

  if (isViewModePending || isPageTransitionPending) {
    return <ProjectGridLargeSkeleton items={Children.count(children)} />;
  }

  return <GridLarge data-test="project-grid-large">{children}</GridLarge>;
}
