"use client";

import { Suspense, useContext } from "react";
import { OverlayTriggerState } from "react-stately";
import { DetailBottomSheet } from "@/components/common/DetailBottomSheet";
import { ProjectDetailClientContainerContext } from "../ProjectDetailClientContainer";
import { ProjectDetailSkeleton } from "../ProjectDetail/ProjectDetailSkeleton";

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
      <Suspense fallback={<ProjectDetailSkeleton />}>
        <ProjectDetailContainer projectId={projectId} />
      </Suspense>
    </DetailBottomSheet>
  );
}
