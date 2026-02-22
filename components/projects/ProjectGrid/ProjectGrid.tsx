"use client";

import React, { Children } from "react";
import { Grid } from "@/components/common/Grid";
import { Repeat } from "@/components/common/Repeat";
import { usePageTransition } from "@/components/common/PageTransitionContext";
import { ProjectGridItemSkeleton } from "../ProjectGridItem/ProjectGridItemSkeleton";

export function ProjectGrid({ children }: { children: React.ReactNode }) {
  const { isFilteringPending, isSortingPending, isPaginationPending } =
    usePageTransition();

  if (isPaginationPending || isFilteringPending || isSortingPending) {
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
