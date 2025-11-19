"use client";

import { useContext } from "react";
import { DetailModal } from "@/components/common/DetailModal";
import { ProjectDetailClientContainerContext } from "../ProjectDetailClientContainer";

export function ProjectDetailModal({ projectId }: { projectId: number }) {
  const ProjectDetailContainer = useContext(
    ProjectDetailClientContainerContext,
  );

  return (
    <DetailModal title="Project Detail">
      <ProjectDetailContainer projectId={projectId} />
    </DetailModal>
  );
}
