"use client";

import { Children } from "react";
import { GridMobile } from "@/components/common/Grid";
import { useEntityListPending } from "@/lib/hooks/useEntityListPending";
import { ProjectGridMobileSkeleton } from "./ProjectGridMobileSkeleton";

interface ProjectGridMobileProps {
  children: React.ReactNode;
}

export function ProjectGridMobile({ children }: ProjectGridMobileProps) {
  const isPending = useEntityListPending();

  if (isPending) {
    return <ProjectGridMobileSkeleton items={Children.count(children)} />;
  }

  return <GridMobile data-test="project-grid-mobile">{children}</GridMobile>;
}
