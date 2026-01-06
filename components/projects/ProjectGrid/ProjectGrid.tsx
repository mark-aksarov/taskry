"use client";

import React, { Children } from "react";
import { Grid } from "@/components/common/Grid";
import { Repeat } from "@/components/common/Repeat";
import { useEntityPagination } from "@/components/common/EntityContainerPagination";
import { ProjectGridItemSkeleton } from "../ProjectGridItem/ProjectGridItemSkeleton";

export function ProjectGrid({ children }: { children: React.ReactNode }) {
  const { isPending } = useEntityPagination();

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
