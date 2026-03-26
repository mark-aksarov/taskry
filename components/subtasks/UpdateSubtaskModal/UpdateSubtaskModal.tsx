import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { UpdateSubtaskForm } from "../UpdateSubtaskForm";
import { useUpdateSubtaskModal } from "./UpdateSubtaskModalContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateSubtaskModalProps {
  subtaskId: number;
  taskId: number;
  subtaskText?: string;
}

export function UpdateSubtaskModal({
  subtaskId,
  taskId,
  subtaskText,
}: UpdateSubtaskModalProps) {
  const t = useTranslations("subtasks.UpdateSubtaskModal");

  const { isOpen: isModalOpen, onOpenChange: onModalOpenChange } =
    useUpdateSubtaskModal();

  return (
    <FormBaseModal
      data-test="edit-subtask-modal"
      className="md:w-[350px]"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("heading")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <UpdateSubtaskForm
            taskId={taskId}
            subtaskId={subtaskId}
            textDefaultValue={subtaskText}
          />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
