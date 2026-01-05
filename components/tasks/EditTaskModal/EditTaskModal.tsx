import { Suspense, useContext } from "react";
import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui";
import { TaskFormBaseSkeleton } from "../TaskFormBase";
import { FormBaseModal } from "@/components/common/FormBaseModal";
import { EditTaskFormContainerContext } from "../EditTaskFormContainerContext";

interface EditTaskModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  taskId: number;
}

export function EditTaskModal({ taskId, ...props }: EditTaskModalProps) {
  const t = useTranslations("tasks.EditTaskModal");

  const EditTaskFormContainer = useContext(EditTaskFormContainerContext);

  if (!EditTaskFormContainer) {
    throw new Error(
      "EditTaskModal must be used within a EditTaskFormClientProvider",
    );
  }

  return (
    <FormBaseModal
      data-test="edit-task-modal"
      formId="edit-task-form"
      title={t("title")}
      submitButtonLabel={t("submitButtonLabel")}
      form={
        <Suspense fallback={<TaskFormBaseSkeleton />}>
          <EditTaskFormContainer taskId={taskId} />
        </Suspense>
      }
      {...props}
    />
  );
}
