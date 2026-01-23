import {
  ModalProps,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@/components/ui";

import {
  FormModal,
  FormModalDialog,
  FormModalSubmitButton,
} from "@/components/common/FormModal";

import { useTranslations } from "next-intl";

interface NewProjectCategoryModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  newProjectCategoryForm: React.ReactNode;
}

export function NewProjectCategoryModal({
  newProjectCategoryForm,
  ...props
}: NewProjectCategoryModalProps) {
  const t = useTranslations("projects.NewProjectCategoryModal");

  return (
    <FormModal className="md:w-[350px]" {...props}>
      <FormModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <DialogBody>{newProjectCategoryForm}</DialogBody>
        <DialogFooter>
          <FormModalSubmitButton
            form="new-project-category-form"
            label={t("submitButtonLabel")}
          />
        </DialogFooter>
      </FormModalDialog>
    </FormModal>
  );
}
