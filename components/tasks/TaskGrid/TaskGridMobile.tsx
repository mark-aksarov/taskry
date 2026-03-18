"use client";

import { Children } from "react";
import { GridMobile } from "@/components/common/Grid";
import { TaskGridMobileSkeleton } from "./TaskGridMobileSkeleton";
import { usePageTransition } from "@/components/common/PageTransitionContext";

interface TaskGridMobileProps {
  children: React.ReactNode;
}

export function TaskGridMobile({ children }: TaskGridMobileProps) {
  const { isPending: isPageTransitionPending } = usePageTransition();

  if (isPageTransitionPending) {
    return <TaskGridMobileSkeleton items={Children.count(children)} />;
  }

  return <GridMobile data-test="task-grid-mobile">{children}</GridMobile>;
}
