import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";
import { EditProjectCategoryForm } from "../EditProjectCategoryForm";
import { useUpdateProjectCategory } from "../UpdateProjectCategoryContext";

interface EditProjectCategoryModalProps {
  projectCategoryId: number;
  projectCategoryName: string;
}

export function EditProjectCategoryModal({
  projectCategoryId,
  projectCategoryName,
}: EditProjectCategoryModalProps) {
  const t = useTranslations("projectCategories.EditProjectCategoryModal");

  const { isModalOpen, onModalOpenChange } = useUpdateProjectCategory();

  return (
    <FormBaseModal
      className="md:w-[350px]"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          <EditProjectCategoryForm
            projectCategoryId={projectCategoryId}
            nameDefaultValue={projectCategoryName}
          />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
