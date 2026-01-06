"use client";

import { Children } from "react";
import { Repeat } from "@/components/common/Repeat";
import { Grid } from "@/components/common/Grid/Grid";
import { UserGridItemSkeleton } from "../UserGridItem/UserGridItemSkeleton";
import { useEntityPagination } from "@/components/common/EntityContainerPagination";

export function UserGrid({ children }: { children: React.ReactNode }) {
  const { isPending } = useEntityPagination();

  if (isPending) {
    return (
      <Grid data-test="users-grid">
        <Repeat
          items={Children.count(children)}
          renderItem={() => <UserGridItemSkeleton />}
        />
      </Grid>
    );
  }

  return <Grid data-test="users-grid">{children}</Grid>;
}
