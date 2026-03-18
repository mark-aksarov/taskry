import {
  DetailModal,
  DetailModalLink,
  DetailModalDialog,
} from "@/components/common/DetailModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface TaskDetailModalProps {
  taskId: number;
  taskDetailContainer: React.ReactNode;
}

export function TaskDetailModal({
  taskId,
  taskDetailContainer,
}: TaskDetailModalProps) {
  const t = useTranslations("tasks.TaskDetailModal");

  return (
    <DetailModal data-test="task-detail-modal">
      <DetailModalDialog>
        <DialogHeaderWithClose>{t("dialogHeading")}</DialogHeaderWithClose>
        <DialogBody>{taskDetailContainer}</DialogBody>
        <DialogFooter>
          <DetailModalLink
            label={t("openInFullPage")}
            href={`/tasks/${taskId}`}
          />
        </DialogFooter>
      </DetailModalDialog>
    </DetailModal>
  );
}
