import "server-only";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProjectDetail } from "@/lib/data/project/project.dal";
import { ProjectDetailAlt, ProjectDetailAltSkeleton } from "./ProjectDetailAlt";
import { DeadlineProvider } from "../common/DeadlineContext";

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
    <DeadlineProvider deadline={project.deadline} status={project.status}>
      <ProjectDetailAlt
        title={project.title}
        creator={project.creator}
        description={project.description}
        client={project.client}
        category={project.category}
        status={project.status}
        tasks={project.tasks}
      />
    </DeadlineProvider>
  );
}
