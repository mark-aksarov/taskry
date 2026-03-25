import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { UpdateProjectCategoryForm } from "../UpdateProjectCategoryForm";
import { useUpdateProjectCategory } from "../UpdateProjectCategoryContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateProjectCategoryModalProps {
  projectCategoryId: number;
  projectCategoryName: string;
}

export function UpdateProjectCategoryModal({
  projectCategoryId,
  projectCategoryName,
}: UpdateProjectCategoryModalProps) {
  const t = useTranslations("projectCategories.UpdateProjectCategoryModal");

  const { isModalOpen, onModalOpenChange } = useUpdateProjectCategory();

  return (
    <FormBaseModal
      className="md:w-[350px]"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <UpdateProjectCategoryForm
            projectCategoryId={projectCategoryId}
            nameDefaultValue={projectCategoryName}
          />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
