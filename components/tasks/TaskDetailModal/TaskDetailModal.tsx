import {
  DetailModal,
  DetailModalDialog,
} from "@/components/common/DetailModal";

import { useTranslations } from "next-intl";
import { DialogBody } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface TaskDetailModalProps {
  taskDetailContainer: React.ReactNode;
}

export function TaskDetailModal({ taskDetailContainer }: TaskDetailModalProps) {
  const t = useTranslations("tasks.TaskDetailModal");
  const { isOpen, onOpenChange } = useModal("taskDetail");

  return (
    <DetailModal
      data-test="task-detail-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DetailModalDialog>
        <DialogHeaderWithClose>{t("dialogHeading")}</DialogHeaderWithClose>
        <DialogBody>{taskDetailContainer}</DialogBody>
      </DetailModalDialog>
    </DetailModal>
  );
}
