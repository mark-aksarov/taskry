"use client";

import { Children } from "react";
import { GridLarge } from "@/components/common/Grid";
import { useEntityListPending } from "@/lib/hooks/useEntityListPending";
import { ProjectGridLargeSkeleton } from "./ProjectGridLargeSkeleton";

interface ProjectGridLargeProps {
  children: React.ReactNode;
}

export function ProjectGridLarge({ children }: ProjectGridLargeProps) {
  const isPending = useEntityListPending();

  if (isPending) {
    return <ProjectGridLargeSkeleton items={Children.count(children)} />;
  }

  return <GridLarge data-test="project-grid-large">{children}</GridLarge>;
}
