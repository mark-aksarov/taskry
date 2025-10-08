"use client";

import { ProjectPreview } from "@/lib/queries/types";
import { ProjectListItem } from "../ProjectListItem";
import { useViewMode } from "@/components/common/ViewMode";
import { List } from "@/components/common/List";

export function ProjectList({ projects }: { projects: ProjectPreview[] }) {
  const { viewMode } = useViewMode();

  if (viewMode !== "list") return null;

  return (
    <List>
      {projects.map((project) => (
        <ProjectListItem key={project.id} project={project} showCheckbox />
      ))}
    </List>
  );
}
