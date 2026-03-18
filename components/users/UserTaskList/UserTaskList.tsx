"use client";

import { Children } from "react";
import { UserTaskListLayout } from "./UserTaskListLayout";
import { UserTaskListSkeleton } from "./UserTaskListSkeleton";
import { usePageTransition } from "@/components/common/PageTransitionContext";

interface UserTaskListProps {
  children: React.ReactNode;
}

export function UserTaskList({ children }: UserTaskListProps) {
  const { isSortingPending, isPaginationPending } = usePageTransition();

  if (isPaginationPending || isSortingPending) {
    return <UserTaskListSkeleton items={Children.count(children)} />;
  }

  return <UserTaskListLayout>{children}</UserTaskListLayout>;
}
