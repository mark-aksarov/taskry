"use client";

import { Children } from "react";
import { Grid } from "@/components/common/Grid";
import { Repeat } from "@/components/common/Repeat";
import { CustomerGridItemSkeleton } from "../CustomerGridItem";
import { usePageTransition } from "@/components/common/PageTransitionContext";

export function CustomerGrid({ children }: { children: React.ReactNode }) {
  const { isFilteringPending, isSortingPending, isPaginationPending } =
    usePageTransition();

  if (isPaginationPending || isFilteringPending || isSortingPending) {
    return (
      <Grid data-test="customers-grid">
        <Repeat
          items={Children.count(children)}
          renderItem={() => <CustomerGridItemSkeleton />}
        />
      </Grid>
    );
  }

  return <Grid data-test="customers-grid">{children}</Grid>;
}
