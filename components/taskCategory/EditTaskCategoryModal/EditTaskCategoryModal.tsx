import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";
import { EditTaskCategoryForm } from "../EditTaskCategoryForm";
import { useUpdateTaskCategory } from "../UpdateTaskCategoryContext";

interface EditTaskCategoryModalProps {
  taskCategoryId: number;
  taskCategoryName: string;
}

export function EditTaskCategoryModal({
  taskCategoryId,
  taskCategoryName,
}: EditTaskCategoryModalProps) {
  const t = useTranslations("taskCategories.EditTaskCategoryModal");

  const { isModalOpen, onModalOpenChange } = useUpdateTaskCategory();

  return (
    <FormBaseModal
      className="md:w-[350px]"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          <EditTaskCategoryForm
            taskCategoryId={taskCategoryId}
            nameDefaultValue={taskCategoryName}
          />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
