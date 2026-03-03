import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";
import { EditTaskCategoryForm } from "../EditTaskCategoryForm";

interface EditTaskCategoryModalProps {
  taskCategoryId: number;
  taskCategoryName: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditTaskCategoryModal({
  taskCategoryId,
  taskCategoryName,
  isOpen,
  onOpenChange,
}: EditTaskCategoryModalProps) {
  const t = useTranslations("taskCategories.EditTaskCategoryModal");

  return (
    <FormBaseModal
      className="md:w-[350px]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
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
