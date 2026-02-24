import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeader } from "@/components/ui/Dialog";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { NewTaskCategoryForm } from "../NewTaskCategoryForm";

interface NewTaskCategoryModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  createTaskCategory: ActionFn<ActionState, FormData>;
}

export function NewTaskCategoryModal({
  createTaskCategory,
  ...props
}: NewTaskCategoryModalProps) {
  const t = useTranslations("taskCategories.NewTaskCategoryModal");

  return (
    <FormBaseModal className="md:w-[350px]" {...props}>
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          <NewTaskCategoryForm createTaskCategory={createTaskCategory} />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
