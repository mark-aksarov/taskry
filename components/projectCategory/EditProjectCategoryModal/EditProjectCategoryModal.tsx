import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeader } from "@/components/ui/Dialog";

interface EditProjectCategoryModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  editProjectCategoryForm: React.ReactNode;
}

export function EditProjectCategoryModal({
  editProjectCategoryForm,
  ...props
}: EditProjectCategoryModalProps) {
  const t = useTranslations("projectCategories.EditProjectCategoryModal");

  return (
    <FormBaseModal className="md:w-[350px]" {...props}>
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          {editProjectCategoryForm}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
