import {
  DetailSideSheet,
  DetailSideSheetDialog,
  DetailSideSheetLink,
} from "@/dashboard/common/DetailSideSheet";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
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
        <DialogBody>{projectDetailContainer}</DialogBody>
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
