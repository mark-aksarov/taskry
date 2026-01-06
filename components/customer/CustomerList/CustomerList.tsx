"use client";

import { Children } from "react";
import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { CustomerListItemSkeleton } from "../CustomerListItem";
import { useEntityPagination } from "@/components/common/EntityContainerPagination";

export function CustomerList({ children }: { children: React.ReactNode }) {
  const { isPending } = useEntityPagination();

  if (isPending) {
    return (
      <List>
        <Repeat
          items={Children.count(children)}
          renderItem={() => <CustomerListItemSkeleton />}
        />
      </List>
    );
  }

  return <List data-test="customers-list">{children}</List>;
}
