"use client";

import { Suspense, useContext } from "react";
import { DetailModal } from "@/components/common/DetailModal";
import { ProjectDetailClientContainerContext } from "../ProjectDetailClientContainer";
import { ProjectDetailSkeleton } from "../ProjectDetail/ProjectDetailSkeleton";

export function ProjectDetailModal({ projectId }: { projectId: number }) {
  const ProjectDetailContainer = useContext(
    ProjectDetailClientContainerContext,
  );

  return (
    <DetailModal title="Project Detail">
      <Suspense fallback={<ProjectDetailSkeleton />}>
        <ProjectDetailContainer projectId={projectId} />
      </Suspense>
    </DetailModal>
  );
}
