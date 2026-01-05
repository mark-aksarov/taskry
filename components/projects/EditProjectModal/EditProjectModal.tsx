"use client";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui";
import { Suspense, useContext } from "react";
import { ProjectFormBaseSkeleton } from "../ProjectFormBase";
import { FormBaseModal } from "@/components/common/FormBaseModal";
import { EditProjectFormContainerContext } from "../EditProjectFormContainerContext";

interface EditProjectModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  projectId: number;
}

export function EditProjectModal({
  projectId,
  ...props
}: EditProjectModalProps) {
  const t = useTranslations("projects.EditProjectModal");

  const EditProjectFormContainer = useContext(EditProjectFormContainerContext);

  if (!EditProjectFormContainer) {
    throw new Error(
      "EditProjectModal must be used within a EditProjectFormProvider",
    );
  }

  return (
    <FormBaseModal
      formId="edit-project-form"
      title={t("title")}
      submitButtonLabel={t("submitButtonLabel")}
      form={
        <Suspense fallback={<ProjectFormBaseSkeleton />}>
          <EditProjectFormContainer projectId={projectId} />
        </Suspense>
      }
      {...props}
    />
  );
}
