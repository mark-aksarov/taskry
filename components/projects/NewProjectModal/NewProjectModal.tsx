import { ModalProps } from "@/components/ui";
import { FormBaseModal } from "@/components/common/FormBaseModal";
import { useTranslations } from "next-intl";

interface NewProjectModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  newProjectForm: React.ReactNode;
}

export function NewProjectModal({
  newProjectForm,
  ...props
}: NewProjectModalProps) {
  const t = useTranslations("projects.NewProjectModal");

  return (
    <FormBaseModal
      title={t("title")}
      submitButtonLabel={t("submitButtonLabel")}
      form={newProjectForm}
      {...props}
    />
  );
}
