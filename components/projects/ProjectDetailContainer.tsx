"use client";

import useSWR from "swr";
import { Suspense } from "react";
import { ProjectDetailDTO } from "@/lib/data/project/project.dto";
import { ProjectDetail, ProjectDetailSkeleton } from "./ProjectDetail";

interface ProjectDetailContainerProps {
  projectId: number;
}

export function ProjectDetailContainer(props: ProjectDetailContainerProps) {
  return (
    <Suspense fallback={<ProjectDetailSkeleton />}>
      <ProjectDetailContainerInner {...props} />
    </Suspense>
  );
}

function ProjectDetailContainerInner({
  projectId,
}: ProjectDetailContainerProps) {
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
    />
  );
}
