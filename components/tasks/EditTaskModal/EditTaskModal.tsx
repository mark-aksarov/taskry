"use client";

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui";
import { TaskFormBaseSkeleton } from "../TaskFormBase";
import { FormModal } from "@/components/common/FormModal";
import { useGlobalContainer } from "@/components/layout/GlobalContainerContext";

interface EditTaskModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  taskId: number;
}

export function EditTaskModal({ taskId, ...props }: EditTaskModalProps) {
  const t = useTranslations("tasks.EditTaskModal");

  const { EditTaskFormContainer } = useGlobalContainer();

  if (!EditTaskFormContainer) {
    throw new Error(
      "EditTaskFormContainer is missing in GlobalContainerContext",
    );
  }

  return (
    <FormModal
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
