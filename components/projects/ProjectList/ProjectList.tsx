"use client";

import { Children } from "react";
import { List } from "@/components/common/List";
import { useViewMode } from "@/components/common/ViewMode";
import { ProjectListSkeleton } from "./ProjectListSkeleton";
import { usePageTransition } from "@/components/common/PageTransitionContext";

interface ProjectListProps {
  children: React.ReactNode;
}

export function ProjectList({ children }: ProjectListProps) {
  const { isPending: isViewModePending } = useViewMode();
  const { isPending: isPageTransitionPending } = usePageTransition();

  if (isViewModePending || isPageTransitionPending) {
    return <ProjectListSkeleton items={Children.count(children)} />;
  }

  return <List data-test="projects-list">{children}</List>;
}
