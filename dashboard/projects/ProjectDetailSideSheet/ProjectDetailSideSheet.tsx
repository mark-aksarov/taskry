import {
  DetailSideSheet,
  DetailSideSheetDialog,
  DetailSideSheetDialogBody,
  DetailSideSheetLink,
} from "@/dashboard/common/DetailSideSheet";

import { DialogFooter } from "@/ui/Dialog";
import { useTranslations } from "next-intl";
import { useModal } from "@/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface ProjectDetailSideSheetProps {
  projectId: number;
  projectDetailContainer: React.ReactNode;
}

export function ProjectDetailSideSheet({
  projectId,
  projectDetailContainer,
}: ProjectDetailSideSheetProps) {
  const t = useTranslations("dashboard.projects.ProjectDetailSideSheet");

  const { isOpen, onOpenChange } = useModal("projectDetail");

  return (
    <DetailSideSheet
      data-test="project-detail-side-sheet"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DetailSideSheetDialog>
        <DialogHeaderWithClose>{t("dialogHeading")}</DialogHeaderWithClose>
        <DetailSideSheetDialogBody>
          {projectDetailContainer}
        </DetailSideSheetDialogBody>
        <DialogFooter>
          <DetailSideSheetLink
            href={`/projects/${projectId}`}
            label={t("openInFullPage")}
          />
        </DialogFooter>
      </DetailSideSheetDialog>
    </DetailSideSheet>
  );
}
