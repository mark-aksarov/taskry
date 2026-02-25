"use client";

import React, { Children } from "react";
import { Grid } from "@/components/common/Grid";
import { Repeat } from "@/components/common/Repeat";
import { ProjectGridItemSkeleton } from "../ProjectGridItem";
import { useEntityListPending } from "@/lib/hooks/useEntityListPending";

export function ProjectGrid({ children }: { children: React.ReactNode }) {
  const isPending = useEntityListPending();

  if (isPending) {
    return (
      <Grid data-test="projects-grid">
        <Repeat
          items={Children.count(children)}
          renderItem={() => <ProjectGridItemSkeleton />}
        />
      </Grid>
    );
  }

  return <Grid data-test="projects-grid">{children}</Grid>;
}
