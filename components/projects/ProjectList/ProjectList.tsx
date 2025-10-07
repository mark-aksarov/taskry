"use client";

import { ProjectPreview } from "@/lib/queries/types";
import { ProjectItem } from "../ProjectItem";
import { useViewMode } from "@/components/common/ViewMode";

export function ProjectList({ projects }: { projects: ProjectPreview[] }) {
  const { viewMode } = useViewMode();

  if (viewMode !== "list") return null;

  return (
    <div className="flex flex-col gap-2">
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} showCheckbox />
      ))}
    </div>
  );
}
