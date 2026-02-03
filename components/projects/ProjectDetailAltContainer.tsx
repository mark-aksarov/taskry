import "server-only";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProjectDetail } from "@/lib/data/project/project.dal";
import { ProjectDetailAlt, ProjectDetailAltSkeleton } from "./ProjectDetailAlt";

interface ProjectDetailAltContainerProps {
  projectId: number;
}

export function ProjectDetailAltContainer(
  props: ProjectDetailAltContainerProps,
) {
  return (
    <Suspense fallback={<ProjectDetailAltSkeleton />}>
      <ProjectDetailAltContainerInner {...props} />
    </Suspense>
  );
}

async function ProjectDetailAltContainerInner({
  projectId,
}: ProjectDetailAltContainerProps) {
  const project = await getProjectDetail(projectId);

  if (!project) {
    notFound();
  }

  return (
    <ProjectDetailAlt
      id={project.id}
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
