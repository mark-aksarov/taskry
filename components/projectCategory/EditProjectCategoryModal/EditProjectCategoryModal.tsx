import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";
import { EditProjectCategoryForm } from "../EditProjectCategoryForm";

interface EditProjectCategoryModalProps {
  projectCategoryId: number;
  projectCategoryName: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditProjectCategoryModal({
  projectCategoryId,
  projectCategoryName,
  isOpen,
  onOpenChange,
}: EditProjectCategoryModalProps) {
  const t = useTranslations("projectCategories.EditProjectCategoryModal");

  return (
    <FormBaseModal
      className="md:w-[350px]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
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
