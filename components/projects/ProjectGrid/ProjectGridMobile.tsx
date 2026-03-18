"use client";

import { Children } from "react";
import { GridMobile } from "@/components/common/Grid";
import { ProjectGridMobileSkeleton } from "./ProjectGridMobileSkeleton";
import { usePageTransition } from "@/components/common/PageTransitionContext";

interface ProjectGridMobileProps {
  children: React.ReactNode;
}

export function ProjectGridMobile({ children }: ProjectGridMobileProps) {
  const { isPending: isPageTransitionPending } = usePageTransition();

  if (isPageTransitionPending) {
    return <ProjectGridMobileSkeleton items={Children.count(children)} />;
  }

  return <GridMobile data-test="project-grid-mobile">{children}</GridMobile>;
}
