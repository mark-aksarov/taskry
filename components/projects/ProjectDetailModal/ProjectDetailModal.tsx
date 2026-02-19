import {
  DetailModal,
  DetailModalLink,
  DetailModalDialog,
} from "@/components/common/DetailModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter, DialogHeader } from "@/components/ui/Dialog";

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
    <DetailModal data-test="project-detail-modal">
      <DetailModalDialog>
        <DialogHeader>{t("dialogHeading")}</DialogHeader>
        <DialogBody>{projectDetailContainer}</DialogBody>
        <DialogFooter>
          <DetailModalLink
            label={t("openInFullPage")}
            href={`/projects/${projectId}`}
          />
        </DialogFooter>
      </DetailModalDialog>
    </DetailModal>
  );
}
