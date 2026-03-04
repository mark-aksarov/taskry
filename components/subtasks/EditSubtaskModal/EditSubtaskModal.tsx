import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { EditSubtaskForm } from "../EditSubtaskForm";
import { DialogHeader } from "@/components/ui/Dialog";

interface EditSubtaskModalProps {
  subtaskId: number;
  taskId: number;
  subtaskText?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditSubtaskModal({
  subtaskId,
  taskId,
  subtaskText,
  isOpen,
  onOpenChange,
}: EditSubtaskModalProps) {
  const t = useTranslations("subtasks.EditSubtaskModal");

  return (
    <FormBaseModal
      data-test="edit-subtask-modal"
      className="md:w-[350px]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
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
