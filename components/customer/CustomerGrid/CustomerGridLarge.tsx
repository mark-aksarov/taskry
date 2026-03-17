"use client";

import { Children } from "react";
import { GridLarge } from "@/components/common/Grid";
import { useEntityListPending } from "@/lib/hooks/useEntityListPending";
import { CustomerGridLargeSkeleton } from "./CustomerGridLargeSkeleton";

export function CustomerGridLarge({ children }: { children: React.ReactNode }) {
  const isPending = useEntityListPending();

  if (isPending) {
    return <CustomerGridLargeSkeleton items={Children.count(children)} />;
  }

  return <GridLarge data-test="customer-grid-large">{children}</GridLarge>;
}
