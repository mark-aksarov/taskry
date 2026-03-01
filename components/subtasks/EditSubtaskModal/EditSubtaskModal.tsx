import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeader } from "@/components/ui/Dialog";
import { EditSubtaskForm } from "../EditSubtaskForm";
import { ActionFn, ActionState } from "@/lib/actions/types";

interface EditSubtaskModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  subtaskId: number;
  taskId: number;
  mutate?: () => void;
  subtaskText?: string;
  updateSubtask: ActionFn<ActionState, FormData>;
}

export function EditSubtaskModal({
  subtaskId,
  taskId,
  mutate,
  subtaskText,
  updateSubtask,
  ...props
}: EditSubtaskModalProps) {
  const t = useTranslations("subtasks.EditSubtaskModal");

  return (
    <FormBaseModal
      data-test="edit-subtask-modal"
      className="md:w-[350px]"
      {...props}
    >
      <FormBaseModalDialog>
        <DialogHeader>{t("heading")}</DialogHeader>
        <FormBaseModalDialogBody>
          <EditSubtaskForm
            taskId={taskId}
            subtaskId={subtaskId}
            updateSubtask={updateSubtask}
            textDefaultValue={subtaskText}
            mutate={mutate}
          />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
