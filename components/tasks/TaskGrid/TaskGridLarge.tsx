"use client";

import { Children } from "react";
import { GridLarge } from "@/components/common/Grid";
import { TaskGridLargeSkeleton } from "./TaskGridLargeSkeleton";
import { useEntityListPending } from "@/lib/hooks/useEntityListPending";

interface TaskGridLargeProps {
  children: React.ReactNode;
}

export function TaskGridLarge({ children }: TaskGridLargeProps) {
  const isPending = useEntityListPending();

  if (isPending) {
    return <TaskGridLargeSkeleton items={Children.count(children)} />;
  }

  return <GridLarge data-test="task-grid-mobile">{children}</GridLarge>;
}
