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
  const { data: project, error } = useSWR<ProjectDetailDTO>(
    `/api/projects/${projectId}`,
    {
      revalidateOnFocus: false,
    },
  );

  if (error) {
    if (error.status === 404) {
      throw new Error(undefined, { cause: "projectNotFound" });
    }

    throw new Error();
  }

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
