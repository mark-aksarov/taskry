"use client";

import { Children } from "react";
import { GridMobile } from "@/components/common/Grid";
import { TaskGridMobileSkeleton } from "./TaskGridMobileSkeleton";
import { useEntityListPending } from "@/lib/hooks/useEntityListPending";

interface TaskGridMobileProps {
  children: React.ReactNode;
}

export function TaskGridMobile({ children }: TaskGridMobileProps) {
  const isPending = useEntityListPending();

  if (isPending) {
    return <TaskGridMobileSkeleton items={Children.count(children)} />;
  }

  return <GridMobile data-test="task-grid-mobile">{children}</GridMobile>;
}
