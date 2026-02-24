import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeader } from "@/components/ui/Dialog";
import { EditTaskCategoryForm } from "../EditTaskCategoryForm";
import { ActionFn, ActionState } from "@/lib/actions/types";

interface EditTaskCategoryModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  taskCategoryId: number;
  taskCategoryName: string;
  updateTaskCategory: ActionFn<ActionState, FormData>;
}

export function EditTaskCategoryModal({
  taskCategoryId,
  taskCategoryName,
  updateTaskCategory,
  ...props
}: EditTaskCategoryModalProps) {
  const t = useTranslations("taskCategories.EditTaskCategoryModal");

  return (
    <FormBaseModal className="md:w-[350px]" {...props}>
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          <EditTaskCategoryForm
            taskCategoryId={taskCategoryId}
            nameDefaultValue={taskCategoryName}
            updateTaskCategory={updateTaskCategory}
          />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
