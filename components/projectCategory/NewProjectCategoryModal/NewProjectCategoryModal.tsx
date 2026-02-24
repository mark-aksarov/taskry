import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeader } from "@/components/ui/Dialog";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { NewProjectCategoryForm } from "../NewProjectCategoryForm";

interface NewProjectCategoryModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  createProjectCategory: ActionFn<ActionState, FormData>;
}

export function NewProjectCategoryModal({
  createProjectCategory,
  ...props
}: NewProjectCategoryModalProps) {
  const t = useTranslations("projectCategories.NewProjectCategoryModal");

  return (
    <FormBaseModal className="md:w-[350px]" {...props}>
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          <NewProjectCategoryForm
            createProjectCategory={createProjectCategory}
          />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
