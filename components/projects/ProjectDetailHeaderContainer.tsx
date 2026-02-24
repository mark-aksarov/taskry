import "server-only";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ProjectDetailHeader } from "./ProjectDetailHeader";
import { DetailHeaderSkeleton } from "../common/DetailHeader";
import { getProjectDetail } from "@/lib/data/project/project.dal";

interface ProjectDetailHeaderContainerProps {
  projectId: number;
}

export function ProjectDetailHeaderContainer(
  props: ProjectDetailHeaderContainerProps,
) {
  return (
    <Suspense fallback={<DetailHeaderSkeleton />}>
      <ProjectDetailHeaderContainerInner {...props} />
    </Suspense>
  );
}

async function ProjectDetailHeaderContainerInner({
  projectId,
}: ProjectDetailHeaderContainerProps) {
  const project = await getProjectDetail(projectId);

  if (!project) {
    notFound();
  }

  return (
    <ProjectDetailHeader
      projectTitle={project.title}
      categoryName={project.category?.name}
    />
  );
}
