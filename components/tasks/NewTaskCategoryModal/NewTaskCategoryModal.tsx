import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui";
import { FormModal } from "@/components/common/FormModal";

interface NewTaskCategoryModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  newTaskCategoryForm: React.ReactNode;
}

export function NewTaskCategoryModal({
  newTaskCategoryForm,
  ...props
}: NewTaskCategoryModalProps) {
  const t = useTranslations("tasks.NewTaskCategoryModal");

  return (
    <FormModal
      formId="new-task-category-form"
      title={t("title")}
      submitButtonLabel={t("submitButtonLabel")}
      form={newTaskCategoryForm}
      className="md:w-[350px]"
      {...props}
    />
  );
}
