"use client";

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui";
import { ProjectFormBaseSkeleton } from "../ProjectFormBase";
import { FormBaseModal } from "@/components/common/FormBaseModal";
import { useGlobalContainer } from "@/components/layout/GlobalContainerContext";

interface EditProjectModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  projectId: number;
}

export function EditProjectModal({
  projectId,
  ...props
}: EditProjectModalProps) {
  const t = useTranslations("projects.EditProjectModal");

  const { EditProjectFormContainer } = useGlobalContainer();

  if (!EditProjectFormContainer) {
    throw new Error(
      "EditProjectFormContainer is missing in GlobalContainerContext",
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
