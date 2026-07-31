import "server-only";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ProjectDetailAltSkeleton } from "./ProjectDetailAlt";
import { ProjectDetailCardHeader } from "./ProjectDetailCard";
import { getProjectDetail } from "@/lib/data/project/project.dal";
import { DeadlineProvider } from "../common/DeadlineContext";

interface ProjectDetailCardHeaderContainerProps {
  projectId: number;
}

export function ProjectDetailCardHeaderContainer(
  props: ProjectDetailCardHeaderContainerProps,
) {
  return (
    <Suspense fallback={<ProjectDetailAltSkeleton />}>
      <ProjectDetailCardHeaderContainerInner {...props} />
    </Suspense>
  );
}

async function ProjectDetailCardHeaderContainerInner({
  projectId,
}: ProjectDetailCardHeaderContainerProps) {
  const project = await getProjectDetail(projectId);

  if (!project) {
    notFound();
  }

  return (
    <DeadlineProvider deadline={project.deadline}>
      <ProjectDetailCardHeader projectStatus={project.status} />
    </DeadlineProvider>
  );
}
