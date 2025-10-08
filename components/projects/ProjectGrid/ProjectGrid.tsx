"use client";

import { useViewMode } from "@/components/common/ViewMode";
import { ProjectGridItem } from "../ProjectGridItem";
import { ProjectPreview } from "@/lib/queries/types";
import { Grid } from "@/components/common/Grid/Grid";

export function ProjectGrid({ projects }: { projects: ProjectPreview[] }) {
  const { viewMode } = useViewMode();

  if (viewMode !== "grid") return null;

  return (
    <Grid>
      {projects.map((project) => (
        <ProjectGridItem key={project.id} project={project} />
      ))}
    </Grid>
  );
}
