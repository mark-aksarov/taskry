"use client";

import { Suspense, useContext } from "react";
import { OverlayTriggerState } from "react-stately";
import { DetailBottomSheet } from "@/components/common/DetailBottomSheet";
import { ProjectDetailCompactClientContainerContext } from "../ProjectDetailCompactClientContainer";
import { ProjectDetailCompactSkeleton } from "../ProjectDetailCompact/ProjectDetailCompactSkeleton";

export interface ProjectDetailBottomSheetProps {
  projectId: number;
  state: OverlayTriggerState;
}

export function ProjectDetailBottomSheet({
  projectId,
  state,
}: ProjectDetailBottomSheetProps) {
  const ProjectDetailContainer = useContext(
    ProjectDetailCompactClientContainerContext,
  );

  return (
    <DetailBottomSheet state={state} title="Project Detail">
      <Suspense fallback={<ProjectDetailCompactSkeleton />}>
        <ProjectDetailContainer projectId={projectId} />
      </Suspense>
    </DetailBottomSheet>
  );
}
