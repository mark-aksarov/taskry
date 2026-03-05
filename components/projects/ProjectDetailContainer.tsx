"use client";

import useSWR from "swr";
import { ProjectDetailDTO } from "@/lib/data/project/project.dto";
import { ProjectDetail, ProjectDetailSkeleton } from "./ProjectDetail";

interface ProjectDetailContainerProps {
  projectId: number;
}

export function ProjectDetailContainer({
  projectId,
}: ProjectDetailContainerProps) {
  const { data: project } = useSWR<ProjectDetailDTO>(
    `/api/projects/${projectId}`,
  );

  //Error handling for 404 (NotFound) error. https://swr.vercel.app/docs/error-handling

  // Show skeleton while loading
  if (!project) {
    return <ProjectDetailSkeleton />;
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
    />
  );
}
