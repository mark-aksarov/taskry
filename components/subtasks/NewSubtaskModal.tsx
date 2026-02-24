import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "../common/FormBaseModal";

import { ModalProps } from "../ui/Modal";
import { useTranslations } from "next-intl";
import { DialogHeader } from "../ui/Dialog";
import { NewSubtaskForm } from "./NewSubtaskForm";
import { ActionFn, ActionState } from "@/lib/actions/types";

interface EditSubtaskModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  taskId: number;
  createSubtask: ActionFn<ActionState, FormData>;
  mutate?: () => void;
}

export function NewSubtaskModal({
  taskId,
  createSubtask,
  mutate,
  ...props
}: EditSubtaskModalProps) {
  const t = useTranslations("subtasks.NewSubtaskModal");

  return (
    <FormBaseModal
      data-test="new-subtask-modal"
      className="md:w-[350px]"
      {...props}
    >
      <FormBaseModalDialog>
        <DialogHeader>{t("heading")}</DialogHeader>
        <FormBaseModalDialogBody>
          <NewSubtaskForm
            taskId={taskId}
            createSubtask={createSubtask}
            mutate={mutate}
          />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
