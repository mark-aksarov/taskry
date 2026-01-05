"use client";

import {
  Modal,
  Dialog,
  Button,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";

import { useTranslations } from "next-intl";
import { Suspense, useContext } from "react";
import { ProjectDetailCompactSkeleton } from "../ProjectDetailCompact";
import { useGlobalContainer } from "@/components/layout/GlobalContainerContext";

export function ProjectDetailModal({ projectId }: { projectId: number }) {
  const t = useTranslations("projects.ProjectDetailModal");

  const { ProjectDetailCompactContainer } = useGlobalContainer();

  if (!ProjectDetailCompactContainer) {
    throw new Error(
      "ProjectDetailCompactContainer is missing in GlobalContainerContext",
    );
  }

  return (
    <Modal isDismissable className="w-[600px]">
      <Dialog className="max-h-[calc(100dvh-64px)]">
        <DialogHeader>
          <DialogHeading>{t("dialogHeading")}</DialogHeading>
          <DialogCloseButton />
        </DialogHeader>
        <DialogBody>
          <Suspense fallback={<ProjectDetailCompactSkeleton />}>
            <ProjectDetailCompactContainer projectId={projectId} />
          </Suspense>
        </DialogBody>
        <DialogFooter>
          <Button
            data-test="open-full-page-button"
            as="a"
            href={`/projects/${projectId}`}
            variant="primary"
            size="medium"
            label={t("openInFullPage")}
            className="w-full justify-center"
          />
        </DialogFooter>
      </Dialog>
    </Modal>
  );
}
