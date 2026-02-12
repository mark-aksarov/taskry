import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeader } from "@/components/ui/Dialog";

interface EditTaskCategoryModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  editTaskCategoryForm: React.ReactNode;
}

export function EditTaskCategoryModal({
  editTaskCategoryForm,
  ...props
}: EditTaskCategoryModalProps) {
  const t = useTranslations("taskCategories.EditTaskCategoryModal");

  return (
    <FormBaseModal className="md:w-[350px]" {...props}>
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          {editTaskCategoryForm}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
