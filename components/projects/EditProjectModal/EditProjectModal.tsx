"use client";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui";
import { Suspense, useContext } from "react";
import { ProjectFormBaseSkeleton } from "../ProjectFormBase";
import { FormBaseModal } from "@/components/common/FormBaseModal";
import { EditProjectFormClientContainerContext } from "../EditProjectFormClientContainerContext";

interface EditProjectModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  projectId: number;
}

export function EditProjectModal({
  projectId,
  ...props
}: EditProjectModalProps) {
  const t = useTranslations("projects.EditProjectModal");

  const EditProjectFormClientContainer = useContext(
    EditProjectFormClientContainerContext,
  );

  if (!EditProjectFormClientContainer) {
    throw new Error(
      "EditProjectModal must be used within a EditProjectFormClientProvider",
    );
  }

  return (
    <FormBaseModal
      title={t("title")}
      submitButtonLabel={t("submitButtonLabel")}
      form={
        <Suspense fallback={<ProjectFormBaseSkeleton />}>
          <EditProjectFormClientContainer projectId={projectId} />
        </Suspense>
      }
      {...props}
    />
  );
}
