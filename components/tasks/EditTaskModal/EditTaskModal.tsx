import { Suspense, useContext } from "react";
import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui";
import { TaskFormBaseSkeleton } from "../TaskFormBase";
import { FormBaseModal } from "@/components/common/FormBaseModal";
import { EditTaskFormClientContainerContext } from "../EditTaskFormClientContainerContext";

interface EditTaskModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  taskId: number;
}

export function EditTaskModal({ taskId, ...props }: EditTaskModalProps) {
  const t = useTranslations("tasks.EditTaskModal");

  const EditTaskFormClientContainer = useContext(
    EditTaskFormClientContainerContext,
  );

  if (!EditTaskFormClientContainer) {
    throw new Error(
      "EditTaskModal must be used within a EditTaskFormClientProvider",
    );
  }

  return (
    <FormBaseModal
      formId="edit-task-form"
      title={t("title")}
      submitButtonLabel={t("submitButtonLabel")}
      form={
        <Suspense fallback={<TaskFormBaseSkeleton />}>
          <EditTaskFormClientContainer taskId={taskId} />
        </Suspense>
      }
      {...props}
    />
  );
}
