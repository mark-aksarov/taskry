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
  const { data: project, isValidating } = useSWR<ProjectDetailDTO>(
    `/api/projects/${projectId}`,
  );

  //Error handling for 404 (NotFound) error. https://swr.vercel.app/docs/error-handling

  // Show skeleton while loading or revalidating (to avoid flickering from stale content)
  const showSkeleton = !project || isValidating;

  if (showSkeleton) {
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
