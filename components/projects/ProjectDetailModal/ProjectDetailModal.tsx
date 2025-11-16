"use client";

import { useProjectDetailContainer } from "@/components/projects/ProjectDetail";
import { DetailModal } from "@/components/common/DetailModal";

export function ProjectDetailModal({ projectId }: { projectId: number }) {
  const ProjectDetailContainer = useProjectDetailContainer();

  return (
    <DetailModal>
      <ProjectDetailContainer projectId={projectId} />
    </DetailModal>
  );
}
