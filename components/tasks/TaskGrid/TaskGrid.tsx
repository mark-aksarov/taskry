"use client";

import { Children } from "react";
import { Repeat } from "@/components/common/Repeat";
import { Grid } from "@/components/common/Grid/Grid";
import { TaskGridItemSkeleton } from "../TaskGridItem";
import { useEntityListPending } from "@/lib/hooks/useEntityListPending";

export function TaskGrid({ children }: { children: React.ReactNode }) {
  const isPending = useEntityListPending();

  if (isPending) {
    return (
      <Grid data-test="tasks-grid">
        <Repeat
          items={Children.count(children)}
          renderItem={() => <TaskGridItemSkeleton />}
        />
      </Grid>
    );
  }

  return <Grid data-test="tasks-grid">{children}</Grid>;
}
