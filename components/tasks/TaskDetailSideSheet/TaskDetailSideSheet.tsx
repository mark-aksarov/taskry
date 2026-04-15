import {
  DetailSideSheet,
  DetailSideSheetDialog,
  DetailSideSheetLink,
} from "@/components/common/DetailSideSheet";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface TaskDetailSideSheetProps {
  taskId: number;
  taskDetailContainer: React.ReactNode;
}

export function TaskDetailSideSheet({
  taskId,
  taskDetailContainer,
}: TaskDetailSideSheetProps) {
  const t = useTranslations("tasks.TaskDetailSideSheet");
  const { isOpen, onOpenChange } = useModal("taskDetail");

  return (
    <DetailSideSheet
      data-test="task-detail-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DetailSideSheetDialog>
        <DialogHeaderWithClose>{t("dialogHeading")}</DialogHeaderWithClose>
        <DialogBody>{taskDetailContainer}</DialogBody>
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
