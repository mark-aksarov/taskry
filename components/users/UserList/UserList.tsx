"use client";

import { Children } from "react";
import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { UserListItemSkeleton } from "../UserListItem";
import { useEntityListPending } from "@/lib/hooks/useEntityListPending";

export type UserListProps = {
  children: React.ReactNode;
};

export function UserList({ children }: UserListProps) {
  const isPending = useEntityListPending();

  if (isPending) {
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
