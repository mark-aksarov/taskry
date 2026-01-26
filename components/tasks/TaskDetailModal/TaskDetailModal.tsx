import {
  DetailModal,
  DetailModalLink,
  DetailModalDialog,
} from "@/components/common/DetailModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter, DialogHeader } from "@/components/ui/Dialog";

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
        <DialogHeader>{t("dialogHeading")}</DialogHeader>
        <DialogBody>{taskDetailContainer}</DialogBody>
        <DialogFooter>
          <DetailModalLink
            label={t("openInFullPage")}
            href={`/tasks?taskId=${taskId}`}
          />
        </DialogFooter>
      </DetailModalDialog>
    </DetailModal>
  );
}
