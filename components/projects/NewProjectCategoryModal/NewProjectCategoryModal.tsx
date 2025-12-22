import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui";
import { FormBaseModal } from "@/components/common/FormBaseModal";

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
    <FormBaseModal
      formId="new-project-category-form"
      title={t("title")}
      submitButtonLabel={t("submitButtonLabel")}
      form={newProjectCategoryForm}
      className="md:w-[350px]"
      {...props}
    />
  );
}
