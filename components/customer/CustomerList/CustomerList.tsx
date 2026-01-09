"use client";

import { Children } from "react";
import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { CustomerListItemSkeleton } from "../CustomerListItem";
import { useEntityPagination } from "@/components/common/EntityContainerPagination";

export type CustomerListProps = {
  children: React.ReactNode;
};

export function CustomerList({ children }: CustomerListProps) {
  const { isPending } = useEntityPagination();

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
