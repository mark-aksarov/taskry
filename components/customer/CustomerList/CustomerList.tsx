"use client";

import { Children } from "react";
import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { CustomerListItemSkeleton } from "../CustomerListItem";
import { useEntityListPending } from "@/lib/hooks/useEntityListPending";

export type CustomerListProps = {
  children: React.ReactNode;
};

export function CustomerList({ children }: CustomerListProps) {
  const isPending = useEntityListPending();

  if (isPending) {
    return (
      <List data-test="customers-list">
        <Repeat
          items={Children.count(children)}
          renderItem={() => <CustomerListItemSkeleton />}
        />
      </List>
    );
  }

  return <List data-test="customers-list">{children}</List>;
}
