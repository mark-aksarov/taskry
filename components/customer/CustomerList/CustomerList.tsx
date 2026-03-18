"use client";

import { Children } from "react";
import { List } from "@/components/common/List";
import { useViewMode } from "@/components/common/ViewMode";
import { CustomerListSkeleton } from "./CustomerListSkeleton";
import { usePageTransition } from "@/components/common/PageTransitionContext";

export type CustomerListProps = {
  children: React.ReactNode;
};

export function CustomerList({ children }: CustomerListProps) {
  const { isPending: isViewModePending } = useViewMode();
  const { isPending: isPageTransitionPending } = usePageTransition();

  if (isViewModePending || isPageTransitionPending) {
    return <CustomerListSkeleton items={Children.count(children)} />;
  }

  return <List data-test="customers-list">{children}</List>;
}
