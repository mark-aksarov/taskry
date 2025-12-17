"use client";

import useSWR from "swr";
import { ProjectDetailDTO } from "@/lib/dto/project";
import { ProjectDetailCompact } from "../ProjectDetailCompact";

export function ProjectDetailCompactClientContainer({
  projectId,
}: {
  projectId: number;
}) {
  const { data: project } = useSWR<ProjectDetailDTO>(
    `/api/projects/${projectId}`,
    { suspense: true },
  );

  if (!project) return null;

  return (
    <ProjectDetailCompact
      id={project.id}
      title={project.title}
      creator={project.creator}
      deadline={project.deadline}
      description={project.description}
      customer={project.customer}
      category={project.category}
      status={project.status}
      attachments={project.attachments}
    />
  );
}
