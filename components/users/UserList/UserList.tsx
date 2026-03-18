"use client";

import { Children } from "react";
import { List } from "@/components/common/List";
import { UserListSkeleton } from "./UserListSkeleton";
import { useViewMode } from "@/components/common/ViewMode";
import { usePageTransition } from "@/components/common/PageTransitionContext";

export type UserListProps = {
  children: React.ReactNode;
};

export function UserList({ children }: UserListProps) {
  const { isPending: isViewModePending } = useViewMode();
  const { isPending: isPageTransitionPending } = usePageTransition();

  if (isViewModePending || isPageTransitionPending) {
    return <UserListSkeleton items={Children.count(children)} />;
  }

  return <List data-test="users-list">{children}</List>;
}
