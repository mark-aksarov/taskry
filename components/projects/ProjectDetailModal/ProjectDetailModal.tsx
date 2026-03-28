import {
  DetailModal,
  DetailModalLink,
  DetailModalDialog,
} from "@/components/common/DetailModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
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

  const { isOpen, onOpenChange } = useModal("projectDetail");

  return (
    <DetailModal
      data-test="project-detail-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
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
