"use client";

import { Children } from "react";
import { Grid } from "@/components/common/Grid";
import { Repeat } from "@/components/common/Repeat";
import { CustomerGridItemSkeleton } from "../CustomerGridItem";
import { useEntityListPending } from "@/lib/hooks/useEntityListPending";

export function CustomerGrid({ children }: { children: React.ReactNode }) {
  const isPending = useEntityListPending();

  if (isPending) {
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
