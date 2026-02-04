import {
  FormModal,
  FormModalDialog,
  FormModalSubmitButton,
} from "@/components/common/FormModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogBody, DialogFooter, DialogHeader } from "@/components/ui/Dialog";

interface NewTaskCategoryModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  newTaskCategoryForm: React.ReactNode;
}

export function NewTaskCategoryModal({
  newTaskCategoryForm,
  ...props
}: NewTaskCategoryModalProps) {
  const t = useTranslations("taskCategories.NewTaskCategoryModal");

  return (
    <FormModal className="md:w-[350px]" {...props}>
      <FormModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <DialogBody>{newTaskCategoryForm}</DialogBody>
        <DialogFooter>
          <FormModalSubmitButton
            form="new-task-category-form"
            label={t("submitButtonLabel")}
          />
        </DialogFooter>
      </FormModalDialog>
    </FormModal>
  );
}
