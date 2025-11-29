import { ModalProps } from "@/components/ui";
import { FormBaseModal } from "@/components/common/FormBaseModal";
import { useTranslations } from "next-intl";

interface NewTaskModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  newTaskForm: React.ReactNode;
}

export function NewTaskModal({ newTaskForm, ...props }: NewTaskModalProps) {
  const t = useTranslations("tasks.NewTaskModal");

  return (
    <FormBaseModal
      title={t("title")}
      submitButtonLabel={t("submitButtonLabel")}
      form={newTaskForm}
      {...props}
    />
  );
}
