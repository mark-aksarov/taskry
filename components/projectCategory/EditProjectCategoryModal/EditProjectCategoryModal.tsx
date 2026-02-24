import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeader } from "@/components/ui/Dialog";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { EditProjectCategoryForm } from "../EditProjectCategoryForm";

interface EditProjectCategoryModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  projectCategoryId: number;
  projectCategoryName: string;
  updateProjectCategory: ActionFn<ActionState, FormData>;
}

export function EditProjectCategoryModal({
  projectCategoryId,
  projectCategoryName,
  updateProjectCategory,
  ...props
}: EditProjectCategoryModalProps) {
  const t = useTranslations("projectCategories.EditProjectCategoryModal");

  return (
    <FormBaseModal className="md:w-[350px]" {...props}>
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          <EditProjectCategoryForm
            projectCategoryId={projectCategoryId}
            nameDefaultValue={projectCategoryName}
            updateProjectCategory={updateProjectCategory}
          />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
