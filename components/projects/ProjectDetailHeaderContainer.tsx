import "server-only";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { DetailHeaderSkeleton } from "../common/DetailHeader";
import { DetailHeader } from "@/components/common/DetailHeader";
import { getProjectDetail } from "@/lib/data/project/project.service";
import { ProjectDetailHeaderImage } from "./ProjectDetailHeaderImage";

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
    <DetailHeader
      title={project.title}
      image={<ProjectDetailHeaderImage />}
      subtitle={project.category.name}
    />
  );
}
