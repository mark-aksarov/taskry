import {
  DetailSideSheet,
  DetailSideSheetDialog,
  DetailSideSheetLink,
} from "@/components/common/DetailSideSheet";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface ProjectDetailSideSheetProps {
  projectId: number;
  projectDetailContainer: React.ReactNode;
}

export function ProjectDetailSideSheet({
  projectId,
  projectDetailContainer,
}: ProjectDetailSideSheetProps) {
  const t = useTranslations("projects.ProjectDetailSideSheet");

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
