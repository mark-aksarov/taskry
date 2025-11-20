"use client";

import { Suspense, useContext } from "react";
import { DetailModal } from "@/components/common/DetailModal";
import { ProjectDetailCompactClientContainerContext } from "../ProjectDetailCompactClientContainer";
import { ProjectDetailCompactSkeleton } from "../ProjectDetailCompact/ProjectDetailCompactSkeleton";

export function ProjectDetailModal({ projectId }: { projectId: number }) {
  const ProjectDetailContainer = useContext(
    ProjectDetailCompactClientContainerContext,
  );

  return (
    <DetailModal title="Project Detail">
      <Suspense fallback={<ProjectDetailCompactSkeleton />}>
        <ProjectDetailContainer projectId={projectId} />
      </Suspense>
    </DetailModal>
  );
}
