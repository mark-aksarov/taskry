import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeader } from "@/components/ui/Dialog";

interface NewProjectCategoryModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  newProjectCategoryForm: React.ReactNode;
}

export function NewProjectCategoryModal({
  newProjectCategoryForm,
  ...props
}: NewProjectCategoryModalProps) {
  const t = useTranslations("projectCategories.NewProjectCategoryModal");

  return (
    <FormBaseModal className="md:w-[350px]" {...props}>
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          {newProjectCategoryForm}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
