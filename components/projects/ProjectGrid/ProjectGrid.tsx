"use client";

import { useViewMode } from "@/components/common/ViewMode";
import { ProjectGridItem } from "../ProjectGridItem";
import { ProjectPreview } from "@/lib/queries/types";

export function ProjectGrid({ projects }: { projects: ProjectPreview[] }) {
  const { viewMode } = useViewMode();

  if (viewMode !== "grid") return null;

  return (
    <div className="@container">
      <div className="grid gap-4 @max-3xl:grid-cols-2 @3xl:@max-5xl:grid-cols-3 @5xl:@max-7xl:grid-cols-4 @7xl:grid-cols-5">
        {projects.map((project) => (
          <ProjectGridItem key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
