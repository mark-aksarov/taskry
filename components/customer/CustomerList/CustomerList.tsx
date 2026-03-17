"use client";

import { Children } from "react";
import { List } from "@/components/common/List";
import { CustomerListSkeleton } from "./CustomerListSkeleton";
import { useEntityListPending } from "@/lib/hooks/useEntityListPending";

export type CustomerListProps = {
  children: React.ReactNode;
};

export function CustomerList({ children }: CustomerListProps) {
  const isPending = useEntityListPending();

  if (isPending) {
    return <CustomerListSkeleton items={Children.count(children)} />;
  }

  return <List data-test="customers-list">{children}</List>;
}
