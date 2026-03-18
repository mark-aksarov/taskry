"use client";

import { Children } from "react";
import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { UserListItemSkeleton } from "../UserListItem";
import { useViewMode } from "@/components/common/ViewMode";
import { usePageTransition } from "@/components/common/PageTransitionContext";

export type UserListProps = {
  children: React.ReactNode;
};

export function UserList({ children }: UserListProps) {
  const { isPending: isViewModePending } = useViewMode();
  const { isPending: isPageTransitionPending } = usePageTransition();

  if (isViewModePending || isPageTransitionPending) {
    return (
      <List data-test="users-list">
        <Repeat
          items={Children.count(children)}
          renderItem={() => <UserListItemSkeleton />}
        />
      </List>
    );
  }

  return <List data-test="users-list">{children}</List>;
}
