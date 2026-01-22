"use client";

import {
  DetailModal,
  DetailModalLink,
  DetailModalDialog,
  DetailModalDialogHeader,
} from "@/components/common/DetailModal";
import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui";

interface ProjectDetailModalProps {
  projectId: number;
  projectDetailContainer: React.ReactNode;
}

export function ProjectDetailModal({
  projectId,
  projectDetailContainer,
}: ProjectDetailModalProps) {
  const t = useTranslations("projects.ProjectDetailModal");

  return (
    <DetailModal>
      <DetailModalDialog>
        <DetailModalDialogHeader>{t("dialogHeading")}</DetailModalDialogHeader>
        <DialogBody>{projectDetailContainer}</DialogBody>
        <DialogFooter>
          <DetailModalLink
            label={t("openInFullPage")}
            href={`/projects?projectId=${projectId}`}
          />
        </DialogFooter>
      </DetailModalDialog>
    </DetailModal>
  );
}
