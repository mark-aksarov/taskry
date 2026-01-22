import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui";
import { FormModal } from "@/components/common/FormModal";

interface NewTaskModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  newTaskForm: React.ReactNode;
}

export function NewTaskModal({ newTaskForm, ...props }: NewTaskModalProps) {
  const t = useTranslations("tasks.NewTaskModal");

  return (
    <FormModal
      data-test="new-task-modal"
      formId="new-task-form"
      title={t("title")}
      submitButtonLabel={t("submitButtonLabel")}
      form={newTaskForm}
      {...props}
    />
  );
}
