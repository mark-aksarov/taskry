"use client";

import useSWR from "swr";
import { ProjectDetail } from "./ProjectDetail";
import { ProjectDetailDTO } from "@/lib/data/project/project.dto";

export function ProjectDetailContainer({ projectId }: { projectId: number }) {
  const { data: project } = useSWR<ProjectDetailDTO>(
    `/api/projects/${projectId}`,
    { suspense: true },
  );

  if (!project) {
    throw new Error("Project not found");
  }

  return (
    <ProjectDetail
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
