"use client";

import { Children } from "react";
import { GridMobile } from "@/components/common/Grid";
import { useEntityListPending } from "@/lib/hooks/useEntityListPending";
import { CustomerGridMobileSkeleton } from "./CustomerGridMobileSkeleton";

export function CustomerGridMobile({
  children,
}: {
  children: React.ReactNode;
}) {
  const isPending = useEntityListPending();

  if (isPending) {
    return <CustomerGridMobileSkeleton items={Children.count(children)} />;
  }

  return <GridMobile data-test="customer-grid-large">{children}</GridMobile>;
}
