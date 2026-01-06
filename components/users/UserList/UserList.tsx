"use client";

import { Children } from "react";
import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { UserListItemSkeleton } from "../UserListItem";
import { useEntityPagination } from "@/components/common/EntityContainerPagination";

export function UserList({ children }: { children: React.ReactNode }) {
  const { isPending } = useEntityPagination();

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
