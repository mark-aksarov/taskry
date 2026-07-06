import {
  DetailSideSheet,
  DetailSideSheetLink,
  DetailSideSheetDialog,
  DetailSideSheetDialogBody,
} from "@/dashboard/common/DetailSideSheet";

import { DialogFooter } from "@/ui/Dialog";
import { useTranslations } from "next-intl";
import { useModal } from "@/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface TaskDetailSideSheetProps {
  taskId: number;
  taskDetailContainer: React.ReactNode;
}

export function TaskDetailSideSheet({
  taskId,
  taskDetailContainer,
}: TaskDetailSideSheetProps) {
  const t = useTranslations("dashboard.tasks.TaskDetailSideSheet");
  const { isOpen, onOpenChange } = useModal("taskDetail");

  return (
    <DetailSideSheet
      data-test="task-detail-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DetailSideSheetDialog>
        <DialogHeaderWithClose>{t("dialogHeading")}</DialogHeaderWithClose>
        <DetailSideSheetDialogBody>
          {taskDetailContainer}
        </DetailSideSheetDialogBody>
        <DialogFooter>
          <DetailSideSheetLink
            href={`/tasks/${taskId}`}
            label={t("openInFullPage")}
          />
        </DialogFooter>
      </DetailSideSheetDialog>
    </DetailSideSheet>
  );
}
