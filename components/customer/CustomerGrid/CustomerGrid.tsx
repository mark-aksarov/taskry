"use client";

import { Children } from "react";
import { Grid } from "@/components/common/Grid";
import { Repeat } from "@/components/common/Repeat";
import { CustomerGridItemSkeleton } from "../CustomerGridItem";
import { useEntityPagination } from "@/components/common/EntityContainerPagination";

export function CustomerGrid({ children }: { children: React.ReactNode }) {
  const { isPending } = useEntityPagination();

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
