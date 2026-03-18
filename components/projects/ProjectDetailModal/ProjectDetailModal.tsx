import {
  DetailModal,
  DetailModalLink,
  DetailModalDialog,
} from "@/components/common/DetailModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

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
        <DialogHeaderWithClose>{t("dialogHeading")}</DialogHeaderWithClose>
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
