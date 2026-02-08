import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeader } from "@/components/ui/Dialog";

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
    <FormBaseModal className="md:w-[350px]" {...props}>
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>{newTaskCategoryForm}</FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
