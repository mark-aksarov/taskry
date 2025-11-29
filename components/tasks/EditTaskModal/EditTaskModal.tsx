import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui";
import { FormBaseModal } from "@/components/common/FormBaseModal";

interface EditTaskModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  editTaskForm: React.ReactNode;
}

export function EditTaskModal({ editTaskForm, ...props }: EditTaskModalProps) {
  const t = useTranslations("tasks.EditTaskModal");

  return (
    <FormBaseModal
      title={t("title")}
      submitButtonLabel={t("submitButtonLabel")}
      form={editTaskForm}
      {...props}
    />
  );
}
