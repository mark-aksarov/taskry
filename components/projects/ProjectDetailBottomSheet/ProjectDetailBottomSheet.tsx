"use client";

import {
  DetailBottomSheet,
  DetailBottomSheetLink,
  DetailBottomSheetDialog,
  DetailBottomSheetDialogHeader,
} from "@/components/common/DetailBottomSheet";

import { useContext } from "react";
import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui";
import { OverlayTriggerStateContext } from "react-aria-components";

export interface ProjectDetailBottomSheetProps {
  projectId: number;
  projectDetailContainer: React.ReactNode;
}

export function ProjectDetailBottomSheet({
  projectId,
  projectDetailContainer,
}: ProjectDetailBottomSheetProps) {
  const state = useContext(OverlayTriggerStateContext);

  if (!state) {
    throw new Error(
      "ProjectDetailBottomSheet must be used within a OverlayTriggerProvider",
    );
  }

  const t = useTranslations("projects.ProjectDetailBottomSheet");

  return (
    <DetailBottomSheet>
      <DetailBottomSheetDialog>
        <DetailBottomSheetDialogHeader>
          {t("dialogHeading")}
        </DetailBottomSheetDialogHeader>
        <DialogBody>{projectDetailContainer}</DialogBody>
        <DialogFooter>
          <DetailBottomSheetLink
            label={t("openInFullPage")}
            href={`/projects?projectId=${projectId}`}
          />
        </DialogFooter>
      </DetailBottomSheetDialog>
    </DetailBottomSheet>
  );
}
