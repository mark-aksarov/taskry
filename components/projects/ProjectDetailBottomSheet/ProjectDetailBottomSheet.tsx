"use client";

import {
  Button,
  Dialog,
  DialogBody,
  BottomSheet,
  DialogFooter,
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";
import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { OverlayTriggerState } from "react-stately";
import { ProjectDetailSkeleton } from "../ProjectDetail";
import { useGlobalContainer } from "@/components/layout/GlobalContainerContext";

export interface ProjectDetailBottomSheetProps {
  projectId: number;
  state: OverlayTriggerState;
}

export function ProjectDetailBottomSheet({
  projectId,
  state,
}: ProjectDetailBottomSheetProps) {
  const t = useTranslations("projects.ProjectDetailBottomSheet");

  const { ProjectDetailContainer } = useGlobalContainer();

  if (!ProjectDetailContainer) {
    throw new Error(
      "ProjectDetailContainer is missing in GlobalContainerContext",
    );
  }

  return (
    <BottomSheet isDismissable state={state} className="md:hidden">
      <Dialog className="max-h-[calc(100dvh-6.25rem)]">
        <DialogHeader>
          <DialogHeading>{t("dialogHeading")}</DialogHeading>
          <DialogCloseButton />
        </DialogHeader>
        <DialogBody>
          <Suspense fallback={<ProjectDetailSkeleton />}>
            <ProjectDetailContainer projectId={projectId} />
          </Suspense>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="primary"
            size="medium"
            label={t("editButtonLabel")}
            className="w-full justify-center"
          />
        </DialogFooter>
      </Dialog>
    </BottomSheet>
  );
}
