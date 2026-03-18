"use client";

import { Children } from "react";
import { GridLarge } from "@/components/common/Grid";
import { useViewMode } from "@/components/common/ViewMode";
import { TaskGridLargeSkeleton } from "./TaskGridLargeSkeleton";
import { usePageTransition } from "@/components/common/PageTransitionContext";

interface TaskGridLargeProps {
  children: React.ReactNode;
}

export function TaskGridLarge({ children }: TaskGridLargeProps) {
  const { isPending: isViewModePending } = useViewMode();
  const { isPending: isPageTransitionPending } = usePageTransition();

  if (isViewModePending || isPageTransitionPending) {
    return <TaskGridLargeSkeleton items={Children.count(children)} />;
  }

  return <GridLarge data-test="task-grid-mobile">{children}</GridLarge>;
}
