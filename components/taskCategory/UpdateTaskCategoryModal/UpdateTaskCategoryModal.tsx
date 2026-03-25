import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { UpdateTaskCategoryForm } from "../UpdateTaskCategoryForm";
import { useUpdateTaskCategory } from "../UpdateTaskCategoryContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateTaskCategoryModalProps {
  taskCategoryId: number;
  taskCategoryName: string;
}

export function UpdateTaskCategoryModal({
  taskCategoryId,
  taskCategoryName,
}: UpdateTaskCategoryModalProps) {
  const t = useTranslations("taskCategories.UpdateTaskCategoryModal");

  const { isModalOpen, onModalOpenChange } = useUpdateTaskCategory();

  return (
    <FormBaseModal
      className="md:w-[350px]"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <UpdateTaskCategoryForm
            taskCategoryId={taskCategoryId}
            nameDefaultValue={taskCategoryName}
          />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
