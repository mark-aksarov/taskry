"use client";

import {
  DetailBottomSheet,
  DetailBottomSheetLink,
  DetailBottomSheetDialog,
} from "@/components/common/DetailBottomSheet";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter, DialogHeader } from "@/components/ui/Dialog";

export interface ProjectDetailBottomSheetProps {
  projectId: number;
  projectDetailContainer: React.ReactNode;
}

export function ProjectDetailBottomSheet({
  projectId,
  projectDetailContainer,
}: ProjectDetailBottomSheetProps) {
  const t = useTranslations("projects.ProjectDetailBottomSheet");

  return (
    <DetailBottomSheet>
      <DetailBottomSheetDialog>
        <DialogHeader>{t("dialogHeading")}</DialogHeader>
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
