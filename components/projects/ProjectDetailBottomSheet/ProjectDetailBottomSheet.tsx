"use client";

import { useContext } from "react";
import { OverlayTriggerState } from "react-stately";
import { DetailBottomSheet } from "@/components/common/DetailBottomSheet";
import { ProjectDetailClientContainerContext } from "../ProjectDetailClientContainer";

export interface ProjectDetailBottomSheetProps {
  projectId: number;
  state: OverlayTriggerState;
}

export function ProjectDetailBottomSheet({
  projectId,
  state,
}: ProjectDetailBottomSheetProps) {
  const ProjectDetailContainer = useContext(
    ProjectDetailClientContainerContext,
  );

  return (
    <DetailBottomSheet state={state} title="Project Detail">
      <ProjectDetailContainer projectId={projectId} />
    </DetailBottomSheet>
  );
}
