"use client";

import { Children } from "react";
import { GridMobile } from "@/components/common/Grid";
import { CustomerGridMobileSkeleton } from "./CustomerGridMobileSkeleton";
import { usePageTransition } from "@/components/common/PageTransitionContext";

export function CustomerGridMobile({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPending: isPageTransitionPending } = usePageTransition();

  if (isPageTransitionPending) {
    return <CustomerGridMobileSkeleton items={Children.count(children)} />;
  }

  return <GridMobile data-test="customer-grid-large">{children}</GridMobile>;
}
