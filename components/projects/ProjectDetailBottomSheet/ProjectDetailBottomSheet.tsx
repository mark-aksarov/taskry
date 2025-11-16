"use client";

import { OverlayTriggerState } from "react-stately";
import { useProjectDetailContainer } from "../ProjectDetail";
import { DetailBottomSheet } from "@/components/common/DetailBottomSheet";

export interface ProjectDetailBottomSheetProps {
  projectId: number;
  state: OverlayTriggerState;
}

export function ProjectDetailBottomSheet({
  projectId,
  state,
}: ProjectDetailBottomSheetProps) {
  const ProjectDetailContainer = useProjectDetailContainer();

  return (
    <DetailBottomSheet state={state} title="Project Detail">
      <ProjectDetailContainer projectId={projectId} />
    </DetailBottomSheet>
  );
}
