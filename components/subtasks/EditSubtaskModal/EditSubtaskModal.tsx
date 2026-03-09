import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { EditSubtaskForm } from "../EditSubtaskForm";
import { DialogHeader } from "@/components/ui/Dialog";
import { useUpdateSubtask } from "../UpdateSubtaskContext";

interface EditSubtaskModalProps {
  subtaskId: number;
  taskId: number;
  subtaskText?: string;
}

export function EditSubtaskModal({
  subtaskId,
  taskId,
  subtaskText,
}: EditSubtaskModalProps) {
  const t = useTranslations("subtasks.EditSubtaskModal");

  const { isModalOpen, onModalOpenChange } = useUpdateSubtask();

  return (
    <FormBaseModal
      data-test="edit-subtask-modal"
      className="md:w-[350px]"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeader>{t("heading")}</DialogHeader>
        <FormBaseModalDialogBody>
          <EditSubtaskForm
            taskId={taskId}
            subtaskId={subtaskId}
            textDefaultValue={subtaskText}
          />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
